import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const users = await prisma.user.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })
        return NextResponse.json(users)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}
export async function POST(req:Request) {
    const data = await req.json()
    
    const existingUser = await prisma.user.findFirst({
        where:{
            username: data.username,
        }
    })
    if(existingUser) return NextResponse.json({message: 'This user already exists'}, {status:400})
    
    try {
        const newUser = await prisma.user.create({
            data
        })
        
        return NextResponse.json(newUser)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}