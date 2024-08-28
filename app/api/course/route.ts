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

export async function PATCH(req:Request){
    const data = await req.json()

    const {courseId, lecturerId} = data

    const findIfTheLecturerExistsOnTheCourse = await prisma.lecturer.findFirst({
        where:{
            id: lecturerId,
            course: {
                some:{
                    id: courseId
                }
            }
        }
    })

    if(findIfTheLecturerExistsOnTheCourse) return NextResponse.json({message: "This lecturer already teaches this course"}, {status:400})

    try{
        const addLecturerToCourse =  await prisma.lecturer.update({
            where:{
                id: lecturerId
            },
            data:{
                course: {
                    connect:{
                        id: courseId
                    }
                }
            }
            
        })
        console.log('course', JSON.stringify(addLecturerToCourse))
        return  NextResponse.json({message: "Updated succesfully"}, {status:200})
    }catch(error){
        return NextResponse.json({message: error}, {status: 500})
    }
}