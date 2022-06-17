import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/genealogy-tree`);

const app = express();

app.use(express.json());
app.use(routes);

export default app;