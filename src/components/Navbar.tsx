"use client"

import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation'

export default function Navbar() {

    const { data: session } = useSession();

    const router = useRouter()

    return (
        <nav className='bg-slate-900 flex justify-between items-center px-20 py-3 text-white'>
            <Link href="/">
                <h1 className='text-4xl font-bold'>Linkhub</h1>
            </Link>

            {session?.user ? (
                <div className='flex space-x-12 items-center'>
                    <div className='flex space-x-2 items-center'>
                        <h1>Olá, {session.user.name}</h1>
                        <img src={session.user.image as string} alt="Foto de Perfil" className='w-8 h-8 rounded-full cursor-pointer' />
                    </div>
                    <Link href="/dashboard" className='text-sky-300 font-bold hover:text-white border-solid border-2 border-sky-300 hover:bg-sky-300 px-3 py-2 rounded-lg'>Dashboard</Link>
                    <button onClick={async () => {
                        await signOut()
                        router.push('/')
                    }} className='text-sky-300 font-bold hover:text-white border-solid border-2 border-sky-300 hover:bg-sky-300 px-3 py-2 rounded-lg'>
                        Sair
                        <Link href="/"></Link>
                    </button>
                </div>
            ) : (
                <button onClick={() => signIn('auth0')} className='text-sky-300 font-bold hover:text-white border-solid border-2 border-sky-300 hover:bg-sky-300 px-3 py-2 rounded-lg'>
                    Entrar
                </button>
            )
            }

        </nav >
    )
}

