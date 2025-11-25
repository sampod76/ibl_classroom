import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  API_BASE_URL: z.string(),
  API_ONLY_BASE_URL: z.string(),
  BACKEND_SOCKET_BASEURL: z.string(),
});

export const configEnv = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  API_ONLY_BASE_URL: process.env.NEXT_PUBLIC_API_ONLY_BASE_URL,
  BACKEND_SOCKET_BASEURL: process.env.NEXT_PUBLIC_BACKEND_SOCKET_BASEURL,
});

export type Env = z.infer<typeof envSchema>;
