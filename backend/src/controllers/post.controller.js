import { prisma } from "../config/database.js"


//add blocks to bad language
const addPost = async(req,res)=>{
    try {
        const { content, showId, spoiler} = req.body;

        if(!content || !spoiler || !showId){
            return res.status(400).json({message: "There's some information that is missing"});
        }

        const showExist = await prisma.show.findUnique({
            where: {id: showId}
        })

        if(!showExist){
            return res.status(400).json({message: "Show doesn't exist"});
        }

        const post = await prisma.post.create({
            data:{
                userId: req.user.id,
                showId,
                content,
                spoiler
            }
        });

        return res.status(200).json({message: "Successfully created Post!", show:showExist, post:post});
        

    } catch (error) {
        console.error(`Failed to create post: ${error}`);
        return res.status(500).json({message: "Failed to add post. Issue with internal server."});
    }
}

const getPosts = async(req,res) =>{
    try {
        const posts = await prisma.post.findMany();
        return res.status(200).json({message: "Success in getting all Posts!", posts:posts});
    } catch (error) {
        console.error(`Failed to get all posts: ${error}`);
        return res.status(500).json({message: "Internal Server Error. Please try again later."});
    }
}

const getSpecificPost = async(req,res) => {
    try {
        const { postId } = req.params;
        if(!postId){
            return res.status(400).json({message: "Failed recieve info needed to look for post"});
        }
        console.log("postId: "+postId);

        const postExists = await prisma.post.findUnique({
            where: {id: postId}
        });
        if(!postExists){
            return res.status(400).json({message: "Post doesn't exists"});
        }

        return res.status(200).json({message: "Success getting specific post.", post: postExists});

    } catch (error) {
        console.error(`Failed to get specific post: ${error}`);
        return res.status(500).json("Internal server error. Please try again later.");
    }
}

const getSpecificShowPosts = async(req,res) =>{
    try {
        const { showId } = req.params;
        if(!showId){
            return res.status(400).json({message: "Missing information for show"});
        }
        console.log("Got showId "+showId);
        //probably can take show exist since will be getting shows from database
        const showExists = await prisma.show.findUnique({
            where: {id:showId}
        });

        console.log(`found show: ${showExists.title}`);
        if(!showExists){
            return res.status(400).json({message: "Show doesn't exists"});
        }

        const postInfo = await prisma.post.findMany({
            where: {showId: showId},
            include:{show:true}
        });
        console.log(`found posts: ${postInfo}`);

        if(postInfo.length === 0){
            console.log(`Success with zero posts.`);
            return res.status(200).json({message: "No post yet! Be the first to post.", post:postInfo}); 
        }
        return res.status(200).json({message: "Success in get show posts", post:postInfo});


    } catch (error) {
        console.error(`Failed in getting post for specific show: ${error}`);
        return res.status(500).json({message: "Internal server error. Please try again later"});
    }
}

const updatePost = async(req,res)=>{
    try {
        const { postId } = req.params;
        const { updateContent, spoiler } = req.body
        if(!postId){
            return res.status(400).json({message: "Missing information to get post."});
        }

        const postExits = await prisma.post.findUnique({
            where: {id: postId}
        });
        if(!postExits){
            return res.status(400).json({message: "Post doesn't exits."});
        }

        await prisma.post.update({
            where:{id:postId},
            data:{
                content: updateContent,
                spoiler,
                updatedAt: new Date()
            }
        });

        return res.status(200).json({message: "Successfully updated post."});
    } catch (error) {
        console.error(`Failed to update post: ${error}`);
        return res.status(500).json({message: "Internal server error. Please try again later."});
    }
}

const deletePost = async(req,res)=>{
    try {
        const { postId } = req.params;
        if(!postId){
            return res.status(400).json({message: "There's missing information to delete post."});
        }

        const postExists = await prisma.post.findUnique({
            where: {id: postId}
        });
        if(!postExists){
            return res.status(400).json({message: "Post does not exists."});
        }

        await prisma.post.delete({
            where:{id:postId}
        });
        return res.status(200).json({message: "Successfully deleted posts."});

    } catch (error) {
        console.error(`Failed to delete post ${error}`);
        return res.status(500).json({message: "Internal server error. Please try again later."});
    }
}

export{
    addPost,
    getPosts,
    getSpecificPost,
    getSpecificShowPosts,
    updatePost,
    deletePost
}