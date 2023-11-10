import { Db, MongoClient } from "mongodb";

interface ConnectType {
    db: Db;
    client: MongoClient;

}

const URL = process.env.DATABASE_URL as string;

const client: MongoClient = new MongoClient(URL);

export default async function connect(): Promise<ConnectType> {
    if (!client.connect) await client.connect()

    const db = client.db('linkhub')

    return { db, client }
}