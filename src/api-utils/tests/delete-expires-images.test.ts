import { PrismaClient, Image } from "@prisma/client";
import fs from "fs";
import deleteExpiredImages from "../delete-expired-images";

jest.mock("@prisma/client", () => {
  const mPrismaClient = {
    image: {
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  };
  return { PrismaClient: jest.fn(() => mPrismaClient) };
});

const mockPrisma = new PrismaClient();

jest.mock("fs", () => ({
  unlinkSync: jest.fn(),
  existsSync: jest.fn().mockReturnValue(true),
}));

describe("deleteExpiredImages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should delete expired images from the database and filesystem", async () => {
    const expiredImage = {
      id: "image1-uuid",
      url: "/uploads/image1.jpg",
      expiresAt: new Date(new Date().getTime() - 1000),
    };

    (mockPrisma.image.findMany as jest.Mock).mockResolvedValue([expiredImage]);

    mockPrisma.image.deleteMany = jest
      .fn()
      .mockResolvedValue({ id: expiredImage.id } as Image);

    await deleteExpiredImages();

    expect(mockPrisma.image.deleteMany).toHaveBeenCalledWith({
      where: { id: { in: [expiredImage.id] } },
    });

    expect(fs.unlinkSync).toHaveBeenCalledWith(expiredImage.url);
  });

  it("should not delete any images if none are expired", async () => {
    (mockPrisma.image.findMany as jest.Mock).mockResolvedValue([]);

    await deleteExpiredImages();

    expect(mockPrisma.image.delete).not.toHaveBeenCalled();
    expect(fs.unlinkSync).not.toHaveBeenCalled();
  });

  it("should handle errors gracefully", async () => {
    const expiredImage = {
      id: "image1-uuid",
      url: "/uploads/image1.jpg",
      expiresAt: new Date(new Date().getTime() - 1000),
    };

    (mockPrisma.image.findMany as jest.Mock).mockResolvedValue([expiredImage]);

    mockPrisma.image.deleteMany = jest
      .fn()
      .mockRejectedValueOnce(new Error("Database error"));

    await expect(deleteExpiredImages()).resolves.not.toThrow();
  });
});
