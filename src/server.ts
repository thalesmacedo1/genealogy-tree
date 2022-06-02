import express from 'express';
import 'dotenv/config'
import mongoose from 'mongoose';
import routes from './routes';

if (process.env.NODE_ENV !== 'test') {
    mongoose.connect(`${process.env.MONGO_CONNECTION_STRING}/genealogy-tree`);
}

const server = express();

server.use(express.json());
server.use(routes);

let port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== 'test') {
    server.listen(port);
}

export default server;