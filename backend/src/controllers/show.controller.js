import { prisma } from "../config/database.js"

const getShows = async(req, res)=>{
    try {
        const shows = await prisma.show.findMany();
        return res.status(200).json({message: "Successfully got all shows in database.", showsInfo: shows});
        
    } catch (error) {
        console.error(`Failed to get shows: ${error}`);
        return res.status(500).json({message: "Internal server error. Please try again later"});
    }

}

const getSearchShows = async(req,res)=>{
    try {
        const shows = await prisma.show.findMany({
            select:{
                id:true,
                title:true,
                releaseYear:true,
                seasons:true,
                episodes:true,
                posterURL:true
            }
        });

        return res.status(200).json({message:"Successfully got all shows for search from database.", showsInfo:shows});

    } catch (error) {
        console.error(`Failed to get shows for search: ${error}`);
        return res.status(500).json({message: "Internal server error. Please try again later"});
    }
}

export{
    getShows,
    getSearchShows
}