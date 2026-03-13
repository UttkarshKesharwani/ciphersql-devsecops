import dotenv from "dotenv";
dotenv.config();

export const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/ciphersql",
    PG_USER: process.env.PG_USER || "postgres",
    PG_HOST: process.env.PG_HOST || "localhost",
    PG_DATABASE: process.env.PG_DATABASE || "ciphersql_sandbox",
    PG_PASSWORD: process.env.PG_PASSWORD || "postgres",
    PG_PORT: process.env.PG_PORT || 5432,
    LLM_API_KEY: process.env.LLM_API_KEY || "your_openai_or_gemini_api_key",
    JWT_SECRET: process.env.JWT_SECRET || "fallback_development_secret_key",
    DB_URL: process.env.DB_URL || "postgresql://postgres:postgres@localhost:5432/ciphersql",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};