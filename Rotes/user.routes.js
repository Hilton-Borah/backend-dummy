const useRoute = require("express").Router()
const { userModel } = require("../model/useModel");
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

useRoute.post("/register",async(req,res)=>{
    const {email,password,name,age} = req.body;
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            if (err){
                console.log(err)
            }else {
                const user = new userModel({email,password:hash,name,age})
                await user.save()
                res.send("Registered succesfully")
            }
        });
    }catch(err){
        res.send({"error":err})
    }
})

useRoute.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await userModel.find({email})
        if (user.length>0){
            bcrypt.compare(password, user[0].password, (err, result)=> {
                if (result){
                    const token = jwt.sign({ userID : user[0]._id  }, 'hilton');
                    res.send({"msg":"Login successfull","token":token})
                } else {
                    res.send("wrong credential")
                }
            })
        } else {
            res.send("wrong credential")
        }
    }catch(err){
        res.send({"error":err})  
    }
})

module.exports={
    useRoute
}