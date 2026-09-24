// https://yards-resolutions-railroad-cowboy.trycloudflare.com

import express from 'express';
import cors from 'cors';
import route from './api/index.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', route);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
});
