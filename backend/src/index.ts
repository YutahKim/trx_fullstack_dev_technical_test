import express, { Request, Response } from 'express';

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:3000' }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

app.get('/api/data', (req: Request, res: Response) => {
    const message = 'Hello, World!';
    res.json({ message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});