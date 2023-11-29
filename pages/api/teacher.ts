import { NextApiResponse, NextApiRequest } from 'next';
import { ObjectId } from 'mongodb'
import connect from '../../utils/database';

interface ErrorResponseType {
    error: string
}

interface SuccessResponseType {
    _id: string;
    name: string;
    email: string;
    cellphone: string;
    teacher: boolean;
    coins: 1,
    courses: string[],
    available_hours: object,
    available_locations: string[],
    appointments: object[],
    reviews: object[]
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
    if (req.method === "GET") { // Rota para listar usuário
        // Pegando os parâmetros do Body
        const { id } = req.body;



        if (!id) {
            res.status(400).json({ error: "Missing teacher ID on request body" })
            return;
        }

        // Conectando no DB
        const { db } = await connect();

        const response = await db.collection('users').findOne({ "_id": new ObjectId(id) })

        if (!response) {
            res.status(400).json({ error: "Teacher not found" })
            return
        }

        res.status(200).json(response)

    } else {
        res.status(400).json({ error: "Wrong Method" });
    }
}