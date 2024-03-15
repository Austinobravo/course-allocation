import axios from "axios";

export async function getLevels (){
    const response = await axios.get('/api/level')
    return response
}
export async function getLecturers (){
    const response = await axios.get('/api/lecturer')
    return response
}