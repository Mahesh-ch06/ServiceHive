import dotenv from "dotenv";

dotenv.config();

const getEnv = (key: string, fallback?: string) => {
  const value = process.env[key] ?? fallback;
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};

const getEnvList = (key: string, fallback?: string) => {
  const rawValue = getEnv(key, fallback);
  return rawValue
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
};

const clientUrls = getEnvList("CLIENT_URL", "http://localhost:5173");

export const env = {
  port: Number(getEnv("PORT", "5000")),
  mongoUri: getEnv("MONGO_URI"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  clientUrl: clientUrls[0],
  clientUrls,
  adminEmail: getEnv("ADMIN_EMAIL")
};
