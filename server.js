import express from 'express';
import chalk from 'chalk';
import { startDB, client } from './db.js';

const PORT = 3000;

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(chalk.cyan(`Request From: ${req.ip} - ${req.path} - ${JSON.stringify(req.body)}`));

    next();
});

app.get('/api/tasks', async (req, res) => {
    try {
        const result = await client.query(`SELECT * FROM tasks;`);

        res.send({ tasks: result.rows });
    } catch (e) {
        console.error(`Failed to get tasks.`, e);
        res.sendStatus(500);
    }
});

app.get('/api/tasks/:taskId', async (req, res) => {
    const { taskId } = req.params;

    try {
        const result = await client.query(`SELECT * FROM tasks WHERE tasks.id = ${taskId} LIMIT 1;`);

        if (!result.rows.length) {
            res.status(404).send({
                message: `No task found with ID: ${taskId}`,
            });
            return;
        }

        res.send({ task: result.rows[0] });
    } catch (e) {
        console.error(`Failed to get tasks.`, e);
        res.sendStatus(500);
    }
});

app.post('/api/tasks', async (req, res) => {
    try {
        const { task: { title, description, complete } } = req.body;

        if (!title || !description) {
            res.status(400).send({
                message: 'Request to create tasks require both a title and a description.',
            });
        }

        await client.query(`
            INSERT INTO tasks (title, description, complete) VALUES ($1, $2, $3);
        `, [title, description, !!complete]);

        res.status(201).send({
            message: `Task successfully created.`,
        });
    } catch (e) {
        console.error(`Failed to create task.`, e);
        res.sendStatus(500);
    }
});

const startServer = async () => {
    try {
        await startDB();
        app.listen(PORT, () => {
            console.log(chalk.magenta(`Server listening on PORT:${PORT}`));
        });
    } catch (e) {
        console.error('Failed to start database or server.', e);
        throw e;
    }
};

startServer();
