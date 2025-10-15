import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING
});

pool.connect()
    .then(() => console.log('🟢 Database connected!'))
    .catch((err) => console.log(`🔴 Error conecting database: ${err}`))


export { pool as db };