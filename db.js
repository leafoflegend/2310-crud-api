import pg from 'pg';

const client = new pg.Pool({
    user: 'eszwajkowski',
    host: 'localhost',
    database: '2310_crud_api',
    port: '5432',
});

export const startDB = async () => {
    const specificClient = await client.connect();

    return specificClient;
};

export default client;
