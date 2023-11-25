import { Db, MongoClient } from "mongodb";

interface ConnectType {
    cachedDb: Db
    db: Db;
    client: MongoClient
}

let cachedDb: Db;

// Função que cria a conexão com o DB
export default async function connect(): Promise<ConnectType> {

    // Checando se já existe uma conexão com o DB
    if (cachedDb) {
        console.log("Existing cached connection found!");
    }
    console.log("Aquiring new DB connection....");
    try {
        // Conectando no MongoDB

        const client = new MongoClient(process.env.MONGO_DB_URL as string);

        // Especificando qual DB iremos nos conectar
        const db = await client.db(process.env.MONGO_DB_NAME);

        cachedDb = db;
        return { db, client, cachedDb };
    } catch (error) {
        console.log("ERROR aquiring DB Connection!");
        console.log(error);
        throw error;
    }
}