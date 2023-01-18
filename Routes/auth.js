import express from 'express';
import User from "../models/user.js"
const router=express.Router();

router.get('/', function(req, res){
    res.send("route detected")
})

//for new user registrations not get method its POST method but for testing purpose it is set to get
router.post("/register",async(req,res)=>{
    const newUser= new User({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
    })
    try{

       const user= await newUser.save();
       res.status(201).json(user)
    }catch(e){
        console.log(e);
    }
})

router.post('/login', async(req,res)=>{
    
    try{
        const user=await User.findOne({email:req.body.email});
        // !user && res.status(404).send("user not found");


        if(user.password=== req.body.password){
            res.status(200).send(user)

        }else{
            res.status(400).send({message:"wrong password"})
        }
    }catch(e){
        console.log(e);
    }
})

export default router;