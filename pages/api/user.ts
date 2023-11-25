import { NextApiResponse, NextApiRequest } from 'next';
import connect from '../../utils/database';

interface ErrorResponseType {
    error: string
}

interface SuccessResponseType {
    _id: string;
    name: string;
    email: string;
    cellphone: string;
    teacher: string;
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
    if (req.method === "POST") {

        // Pegando os parâmetros do Body
        const {
            name,
            email,
            cellphone,
            teacher,
        } = req.body;

        // Validações antes de conectar no DB
        if (!name || !email || !cellphone || !teacher) {
            res.status(400).json({ error: 'Missing body parameters' });
            return
        }

        // Conectando no DB
        const { db } = await connect();

        // Inserindo dados no DB

        const response = await db.collection('users').insertOne({
            name, email, cellphone, teacher
        });

        const responseData = await db.collection('users').findOne({ _id: response.insertedId });

        res.status(200).json(responseData);

    } else {
        res.status(400).json({ error: "Wrong Method" });
    }
}