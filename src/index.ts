import express, { Request, Response } from 'express';

const app = express();

app.get('/ping', (_: Request, res: Response) => {
    res.status(200).send('Alive!')
})


console.log('Running on port 3001');
app.listen(3001);