import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";

const handler = NextAuth({
    providers: [
        Auth0Provider({
            clientId: process.env.AUTH0_CLIENT_ID as string,
            clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
            issuer: process.env.AUTH0_ISSUER as string,
        })
    ]
})

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
    handler(req, res, handler)