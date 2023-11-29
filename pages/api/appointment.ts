import { NextApiResponse, NextApiRequest } from 'next';
import { getServerSession } from "next-auth/next"
import connect from '../../utils/database';
import { ObjectId } from 'mongodb';
import { authOptions } from './auth/[...nextauth]'

interface ErrorResponseType {
    error: string
}

interface SuccessResponseType {
    date: string,
    teacher_name: string,
    teacher_id: string,
    student_name: string,
    student_id: string,
    course: string,
    location: string,
    appointment_link: string
}

export default async (
    req: NextApiRequest,
    res: NextApiResponse<SuccessResponseType | ErrorResponseType>
): Promise<void> => {
    if (req.method === "POST") { // Rota para listar usuário

        // Validando se está logado
        const session = await getServerSession(req, res, authOptions)

        if (!session) {
            res.status(400).json({ error: "Please login first" })
            return;
        }

        // Pegando os parâmetros do Body
        const {
            date,
            teacher_name,
            teacher_id,
            student_name,
            student_id,
            course,
            location,
            appointment_link } = req.body;


        // Fazendo validações
        if (!date ||
            !teacher_name ||
            !teacher_id ||
            !student_name ||
            !student_id ||
            !course ||
            !location) {
            res.status(400).json({ error: "Missing parameter on request body" })
            return;
        }

        // Conectando no DB
        const { db } = await connect();

        //Checando se existe Professor
        const teacherExists = await db.collection('users').findOne({
            _id: new ObjectId(teacher_id)
        })

        if (!teacherExists) {
            res.status(400).json({ error: `Teacher ${teacher_name} with ID ${teacher_id} does not exist` })
            return;
        }


        //Checando se existe Aluno
        const studentExists = await db.collection('users').findOne({
            _id: new ObjectId(student_id)
        })

        if (!studentExists) {
            res.status(400).json({ error: `Student ${student_name} with ID ${student_id} does not exist` })
            return;
        }


        const appointment = {
            date,
            teacher_name,
            teacher_id,
            student_name,
            student_id,
            course,
            location,
            appointment_link: appointment_link || ''
        }

        await db.collection('users').updateOne({ _id: new ObjectId(teacher_id) }, { $push: { appointments: appointment } })
        await db.collection('users').updateOne({ _id: new ObjectId(student_id) }, { $push: { appointments: appointment } })
        res.status(200).json(appointment)

    } else {
        res.status(400).json({ error: "Wrong Method" });
    }
}