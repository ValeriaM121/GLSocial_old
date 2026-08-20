import { prisma } from "../config/database.js"

const addPost = async(req,res)=>{
    try {
        const { content, showId, movieId} = req.body;

        if(!showId && !movieId){
            return res.status(400).json({message: "There's some information that is missing"});
        }
        if(!content){
            return res.status(400).json({message: "There's some information that is missing"});
        }

        

    } catch (error) {
        
    }
}