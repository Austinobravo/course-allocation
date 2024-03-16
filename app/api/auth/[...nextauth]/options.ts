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
                        username: credentials.username
                    }
                })
            }
        })
    ]
}