import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient()
async function main() {
    const hashedPassword = await hash('password',12)
    const newUser = await prisma.user.create({
        data:{
            username: "admin",
            password: hashedPassword
        }
    })
    console.log("newUser", newUser)
    // const levels = await prisma.levels.createMany({
    //     data:[
    //         {level: '100'},
    //         {level: '200'},
    //         {level: '300'},
    //         {level: '400'},
    //         {level: '500'},
    //     ]
    // })
    // console.log("level", levels)
    
}
main()
.then(async() =>{
    await prisma.$disconnect()
})
.catch(async(error) => {
    console.error("error", error)
    await prisma.$disconnect()
    process.exit(1)
})