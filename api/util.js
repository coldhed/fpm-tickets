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

async function logDB(action, user) {
    let db = await connectDB();

    const log = {
        action: action,
        user: user,
        date: new Date()
    }

    await db.collection('logs').insertOne(log);
}

async function Authenticate(req, res, next) {
    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (verifiedToken.rol != "ce") {
            return res.sendStatus(401);
        }

        next();
    } catch {
        return res.sendStatus(401);
    }
}

export { connectDB, logDB }