import { startDB, client } from './db.js';
import chalk from 'chalk';

const seed = async () => {
    let i = null;

    try {
        i = await startDB();

        const query = `
            DROP TABLE IF EXISTS tasks;

            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                description TEXT,
                complete BOOLEAN
            );

            INSERT INTO tasks (title, description, complete) 
            VALUES ('Demo', 'A demo of APIs powered by SQL.', false);
        `;

        await client.query(query);
    } catch (e) {
        console.error(`Failed to seed initial data in database.`, e);
        throw e;
    }

    console.log(chalk.green('Successfully seeded database!'));

    await i.release();
    await client.end();
    process.exit(0);
};

seed();
