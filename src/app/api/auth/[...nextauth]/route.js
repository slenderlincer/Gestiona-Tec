import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/libs/prisma.js";
import bcrypt from 'bcrypt'
import { signIn } from "next-auth/react";

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials:{
                username: {id: "input-username-for-user", label:"User", type: "text", placeholder:"jsmith"},
                password:{id: "input-password-for-user", label:"password", type: "password", placeholder: "****"},
                role: {id: "select-role", label: "Role", type: "select", options: ["USER", "ADMIN"]}
            },
           async authorize(credentials, req){
                const userNameFound = await prisma.user.findUnique({
                    where:{
                        username: credentials.username
                    }
                })

                if(!userNameFound) throw new Error('User not found')
                console.log(userNameFound)


                const matchPassword = await bcrypt.compare(credentials.password, userNameFound.password)
                if(!matchPassword) throw new Error('Wrong password')

                // Verificar el rol del usuario
                if (userNameFound.role !== credentials.role) throw new Error('Incorrect role')

                return {
                    id: userNameFound.id,
                    name: userNameFound.username,
                    email: userNameFound.email,
                    rol: userNameFound.role
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/auth/login",
    }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
