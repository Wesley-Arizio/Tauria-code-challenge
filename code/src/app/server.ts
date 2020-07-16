import express from 'express';
import publicRoute from './routes/public';
import privateRoute from './routes/private'

const app = express();

app.use(express.json());

app.use(publicRoute);
app.use(privateRoute);

export default app;