import express from 'express';
import bodyParser from 'body-parser';
import client, { startDB } from './db.js';

const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send('Hello to you too!');
});

app.get('/api/data', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM tasks');
        res.json(result.rows);
        client.release();
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

const start = async () => {
    await startDB();

    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
};

start();
