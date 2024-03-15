import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const courses = await prisma.course.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            include:{
                lecturer: true
            }
        })
        return NextResponse.json(courses)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}
export async function POST(req:Request) {
    const data = await req.json()
    const {title, code, unit, levelId, lecturer} = data
    console.log("HEre",title, code, unit, levelId, lecturer)
    const existingCourse = await prisma.course.findFirst({
        where:{
            code: data.code,
            levelId: +data.levelId
        }
    })
    if(existingCourse) return NextResponse.json({message: 'This course already exists'}, {status:400})
    
    try {
        const newCourse = await prisma.course.create({
            data
        })
        
        return NextResponse.json(newCourse)
        
    } catch (error) {
        console.error(error)
        return NextResponse.error()
        
    }
    
}