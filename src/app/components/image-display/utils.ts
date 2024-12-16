export const calculateDaysLeft = (expiresAt: Date | string): number => {
  const currentDate = new Date();
  const expirationDate = new Date(expiresAt);
  const differenceInTime = expirationDate.getTime() - currentDate.getTime();
  return Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));
};
