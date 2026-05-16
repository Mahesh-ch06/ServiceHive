import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

export const env = {
  port: Number(getEnv("PORT", "5000")),
  mongoUri: getEnv("MONGO_URI"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  clientUrl: getEnv("CLIENT_URL", "http://localhost:5173")
};
