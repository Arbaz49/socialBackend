import express from "express";
import User from "../models/user.js";
const router = express.Router();

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const user = await User.findByIdAndUpdate(req.body.userId, {
          $set: req.body,
        });
        res.status(200).send("account updated successfully");
      } catch (e) {
        return res.status(500).json(e);
      }
    }
  } else {
    return res.status(403).json("you can update only your account");
  }
});


//delete
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
          const user = await User.deleteOne({"_id":req.body.userId});
          res.status(200).send({
            
              message:"account deleted successfully"
          });
        } catch (e) {
            console.log(e);
          return res.status(500).json(e);
        }
    } else {
      return res.status(403).json("you can delete only your account");
    }
  });



  // get user
  router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).send(user);
      } catch (e) {
          console.log(e);
        return res.status(500).json(e);
      }
  });


  //follow user
router.put("/:id/follow", async(req,res)=>{
  if(req.body.id !== req.params.id){
try{
  const user = await User.findById(req.params.id);
  const currentUser = await User.findById(req.body.id)
 if(!user.followers.includes(req.body.id)){
await user.updateOne({$push:{followers:req.body.id}})
await currentUser.updateOne({$push:{following:req.params.id}})
res.status(200).json("user has been followed")
 }else{
  res.status(403).send("you have already followed this user")
 }
} catch(e){
  console.log(e)
  res.status(500).json(e)
}
  }else{
    res.status(403).json("you cant follow  yourself");
  }
});

// /unfollow user
router.put("/:id/unfollow", async(req,res)=>{
  if(req.body.id !== req.params.id){
try{
  const user = await User.findById(req.params.id);
  const currentUser = await User.findById(req.body.id)
 if(user.followers.includes(req.body.id)){
await user.updateOne({$pull:{followers:req.body.id}})
await currentUser.updateOne({$pull:{following:req.params.id}})
res.status(200).json("user has been unfollowed")
 }else{
  res.status(403).send("you have already unfollowed this user")
 }
} catch(e){
  console.log(e)
  res.status(500).json(e)
}
  }else{
    res.status(403).json("you cant unfollow  yourself");
  }
});
  
export default router;
