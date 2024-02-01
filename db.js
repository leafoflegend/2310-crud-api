import pg from 'pg';
import chalk from 'chalk';

const DATABASE_NAME = '2310_crud_api';

const client = new pg.Pool({
    username: 'eszwajkowski',
    port: 5432,
    database: DATABASE_NAME,
    host: 'localhost',
});

const startDB = async () => {
    let instance;

    try {
        instance = await client.connect();
        console.log(chalk.green(`Successfully connected to database: ${DATABASE_NAME}`));
    } catch (e) {
        console.error('Failure connecting to database.', e);
        throw e;
    }

    return instance;
};

export { client, startDB };
