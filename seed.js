import client, { startDB } from './db.js';

const createTasks = async () => {
    try {
        const createTableQuery = `
            DROP TABLE IF EXISTS tasks;

            CREATE TABLE IF NOT EXISTS tasks (
                uuid uuid PRIMARY KEY,
                name VARCHAR(255),
                description TEXT,
                complete BOOLEAN
            );
        `;

        await client.query(createTableQuery);

        console.log('Table tasks created successfully');
    } catch (err) {
        console.error('An error occurred', err);
    }
};

const seed = async () => {
    const c = await startDB();
    await createTasks();
    await c.release();
    await client.end();
    process.exit(0);
}

seed();
