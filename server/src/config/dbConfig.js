import mongoose from "mongoose";
import { config } from "../config/env.js";
import pool from "./connectionPool.js";


export async function connectToMongoDB() {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.log("MongoDB connection error", error);
        process.exit(1);
    }
}

export async function connectToPostgreSQL() {
    try {

        // pool.on("connect") only fires when a physical database connection is established. 
        // Postgres pools connect lazily, meaning it waits until the first query!
        pool.on("connect", () => {
            console.log("🐘 New PostgreSQL connection client created");
        });

        // Let's force a query to ensure the pool connects properly on boot up.
        // pool.query() automatically checks out a client and releases it back.
        const res = await pool.query('SELECT NOW()');
        // console.log(res)
 
        console.log("✅ PostgreSQL initialized successfully at:", res.rows[0].now);

    } catch (error) {
        console.log("PostgreSQL connection error", error);
        process.exit(1);
    }
}