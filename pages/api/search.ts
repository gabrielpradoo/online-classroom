import { NextApiResponse, NextApiRequest } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
    error: string
}


export default async (
    req: NextApiRequest,
    res: NextApiResponse<ErrorResponseType | object[]>
): Promise<void> => {
    if (req.method === "GET") { // Rota para listar usuário
        // Pegando os parâmetros do Body
        const { courses } = req.body;

        if (!courses) {
            res.status(400).json({ error: "Missing course name on request body" })
            return;
        }

        // Conectando no DB
        const { db } = await connect();

        const response = await db.collection('users').find({ courses }).toArray()

        if (response.length === 0) {
            res.status(400).json({ error: "Course not found" })
            return
        }

        res.status(200).json(response)

    } else {
        res.status(400).json({ error: "Wrong Method" });
    }
}