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

const defaultClientUrls = [
  "http://localhost:5173",
  "https://client-fawn-eta-71.vercel.app",
  "https://client-5wyr4h75d-mahesh-ch06s-projects.vercel.app"
];

const clientUrls = Array.from(
  new Set([
    ...defaultClientUrls,
    ...getEnvList("CLIENT_URL", "")
  ])
);

export const env = {
  port: Number(getEnv("PORT", "5000")),
  mongoUri: getEnv("MONGO_URI"),
  jwtSecret: getEnv("JWT_SECRET"),
  jwtExpiresIn: getEnv("JWT_EXPIRES_IN", "7d"),
  clientUrl: clientUrls[0],
  clientUrls,
  adminEmail: getEnv("ADMIN_EMAIL")
};
