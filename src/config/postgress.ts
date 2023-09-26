import Pool from 'pg-pool';
import {Client} from 'pg';
require('dotenv').config();

const config: Pool.Config<Client> = {
    database : process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 5
}

export const pool = new Pool(config);