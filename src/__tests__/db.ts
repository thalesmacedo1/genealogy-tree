import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongoServer: MongoMemoryServer;

export const connect = async () => {
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();
    mongoose.connect(mongoUri, err => {
        if (err) {
            console.error(err);
        }
    });
};

export const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};