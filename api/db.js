import { MongoClient } from 'mongodb'


let db;

async function connectDB() {
    if (db) return db;

    let client = new MongoClient(process.env.MONGODB_URI)

    try {
        await client.connect();
        db = client.db("");
        return db;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}

export { connectDB }