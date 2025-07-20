import { MongoClient,Db} from "mongodb";


const client = new MongoClient(process.env.DB_CONNECTION);

/**
 * @type {Db | null}
 */
let db = null;

/**
 * @returns {Promise<Db>}
 */
export async function connectToRiddleDB() {
    if (!db) {
        await client.connect();
        db = client.db("riddles_db");
        console.log("Connected to MongoDB");
    }
    return db;
}

connect();