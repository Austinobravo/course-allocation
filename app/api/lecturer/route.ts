import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const lecturers = await prisma.lecturer.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            include:{
                course:true
            }
        })
        return NextResponse.json(lecturers)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}
export async function POST(req:Request) {
    const data = await req.json()

    try {
        const newLecturer = await prisma.lecturer.create({
            data
        })
        
        return NextResponse.json(newLecturer)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}