import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './api/index.js';
import { createRequestHandler } from '@react-router/express';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', route);


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
