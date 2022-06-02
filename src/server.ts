import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import routes from './routes';

mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/genealogy-tree`);

const server = express();

server.use(express.json());
server.use(routes);

const port = process.env.PORT || 8080;
server.listen(port);
