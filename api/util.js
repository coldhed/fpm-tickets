import { MongoClient } from 'mongodb'
import jwt from 'jsonwebtoken';


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

// middleware that takes a set of possible roles for that endpoint
// and checks if the user has one of those roles
const authenticate = (roles = new Set(["ce", "cn", "ca"])) => (req, res, next) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!roles.has(verifiedToken.rol)) {
            return res.sendStatus(401);
        }

        // add user to request to log their actions
        req.userRequesting = verifiedToken.user;

        next();
    } catch {
        return res.sendStatus(401);
    }
}

export { connectDB, logDB, authenticate }