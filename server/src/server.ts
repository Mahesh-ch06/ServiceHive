import app from "./app";
import { connectDatabase } from "./config/db";
import { env } from "./config/env";

const startServer = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${env.port}`);
  });
};

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server", error);
  process.exit(1);
});
