import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Add a test record
  const newImage = await prisma.image.create({
    data: {
      url: "https://example.com/test-image.jpg",
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
    },
  });

  console.log("Created new image:", newImage);

  // Fetch all images
  const images = await prisma.image.findMany();
  console.log("All images:", images);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
