import express from 'express';
import Posts from '../models/Posts.js';
import Post from "../models/Posts.js"
import User from "../models/user.js";

const router =express.Router();


//create a new post
router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update the post
  router.put("/:id",async(req,res)=>{
    try{
      const post =await Post.findById(req.params.id);
      if(post.userId===req.body.userId){
  await post.updateOne({$set :req.body});
  res.status(200).send("your post has been updated"); 
      }else{
        res.status(403).json("you can update only your post")
      }
    }catch(e){
      res.status(500).json(err);
    }

  })


  //delete the post 
  router.delete("/:id",async(req,res)=>{
    try{
      const post =await Post.findById(req.params.id);
      if(post.userId===req.body.userId){
  await post.deleteOne({"_id":req.params.userId})
  res.status(200).send("your post has been deleted"); 
      }else{
        res.status(403).json("you can delete only your post")
      }
    }catch(e){
      res.status(500).json(err);
    }
  })
  
  //like a post /dislike a post
  router.put("/:id/like",async (req,res)=>{
try{
  const post = await Post.findById(req.params.id);
  if(!post.likes.includes(req.params.id)){
    await post.updateOne({$push:{likes:req.body.userId}});
    res.status(200).json("post liked successfully")

  }else{
    await post.updateOne({$pull:{likes:req.body.userId}});
    res.status(200).json("post disliked")

  }

}catch(e){
  res.status(500).json(e)
}
  })

//get a post
router.get('/post/:id',async(req,res)=>{
  try{
const post =await Post.findById(req.params.id);
res.status(200).json(post);
  }catch(e){
    res.status(500).json(e)
  }
})


//get all the post of users and users friends posts
router.get("/all/:userid",async(req,res)=>{
  try{
    const currentuser =await User.findById(req.params.userid);
    const userpost = await Post.find({userId: currentuser._id});
    const friendspost = await Promise.all(
      currentuser.following.map(friendId=>{
        return Posts.find({userId: friendId})
      })
    )
    res.status(200).json(userpost.concat(...friendspost));

  }catch(e){
    console.log(e);
    res.status(500).json(e)
  }
})

  export default router