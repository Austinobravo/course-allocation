import  CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt'
import type { NextAuthOptions } from "next-auth";

import prisma from "@/lib/prisma";

export const options:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "text",
                    type: "text",
                    placeholder: "Your username"
                },
                password: {
                    label: "password",
                    type: "password",
                    placeholder: "Your password"
                },
            },
            async authorize(credentials){
                if(!credentials?.username || !credentials.password) throw new Error("Some fields are empty")

                const user = await prisma.user.findUnique({
                    where:{
                        username: credentials.username.trim()
                    }
                })

                if(!user) throw new Error("User not found")

                const isCorrectPassword = await bcrypt.compare(credentials.password.trim(), user.password)

                if (!isCorrectPassword) throw new Error("Wrong password")

                const {password, ...userWithoutPassword} = user

                return userWithoutPassword
            }
        })
    ],
    pages:{
        signIn: "/login",
        error: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    session:{
        strategy: 'jwt',
        maxAge: 24 * 60 * 60
    },

    callbacks: {
        session: async ({session, token}:any) => {
            return{
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username
                }
            }
        },
        jwt: async({token, user}) => {
            if(user){
                return {
                    ...token,
                    id: user.id,
                    username: (user as any).username
                }
            }
            return token
        }
    }

}