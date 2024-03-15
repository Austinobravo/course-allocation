import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const levels = await prisma.levels.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })
        return NextResponse.json(levels)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}
export async function POST(req:Request) {
    const data = await req.json()
    
    const existingLevel = await prisma.levels.findFirst({
        where:{
            level: data.level
        }
    })
    if(existingLevel) return NextResponse.json({message: 'This level already exists'}, {status:400})
    
    try {
        const newLevel = await prisma.levels.create({
            data
        })
        
        return NextResponse.json(newLevel)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}