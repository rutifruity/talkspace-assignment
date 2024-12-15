import deleteExpiredImages from "@/api-utils/delete-expired-images";
import cron from "node-cron";

// Run the task every day at midnight (00:00)
cron.schedule("0 0 * * *", async () => {
  console.log("Running expired image deletion task...");
  await deleteExpiredImages();
});
