import pg from "pg";
const { Pool } = pg;
import { config } from "./env.js";

console.log(config.DB_URL);

const pool = new Pool({
    connectionString: config.DB_URL,
    max: 20, // maximum number of connections in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
    connectionTimeoutMillis: 2000, // how long to wait for a connection to be established
});

export default pool;