import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../utils/database'

interface ResponseType {
    message: string
}

interface UserType {
    name: string
    age: number
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
): Promise<void> => {
    const { db } = await connect();

    const response = await db.collection<UserType>('users').insertOne({
        name: "Gabriel",
        age: 25,
    });

    res.status(200).json(response);
}