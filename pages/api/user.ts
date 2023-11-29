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
    if (req.method === "POST") { // Rota para criar usuário

        // Pegando os parâmetros do Body
        const {
            name,
            email,
            cellphone,
            teacher,
            courses,
            available_hours,
            available_locations
        } = req.body;

        // Checando se é professor
        if (!teacher) {
            // Validações antes de conectar no DB
            if (!name || !email || !cellphone) {
                res.status(400).json({ error: 'Missing body parameters' });
                return
            }
        } else if (teacher) {
            // Validações antes de conectar no DB
            if (!name || !email || !cellphone || !courses || !available_hours || !available_locations) {
                res.status(400).json({ error: 'Missing body parameters' });
                return
            }
        }



        // Conectando no DB
        const { db } = await connect();

        // Inserindo dados no DB

        const response = await db.collection('users').insertOne({
            name,
            email,
            cellphone,
            teacher,
            coins: 1,
            courses: courses || [],
            available_hours: available_hours || {},
            available_locations: available_locations || [],
            appointments: [],
            reviews: []
        });

        const responseData = await db.collection('users').findOne({ _id: response.insertedId });

        res.status(200).json(responseData);





    } else if (req.method === "GET") { // Rota para listar usuário
        // Pegando os parâmetros do Body
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: "Missing e-mail on request" })
            return;
        }

        // Conectando no DB
        const { db } = await connect();

        const response = await db.collection('users').findOne({ email })

        if (!response) {
            res.status(400).json({ error: "User with this e-mail not found" })
            return
        }

        res.status(200).json(response)
    } else {
        res.status(400).json({ error: "Wrong Method" });
    }
}