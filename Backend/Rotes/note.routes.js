const { noteModel } = require("../model/noteModel")

const noteRoute = require("express").Router()

noteRoute.get("/",async(req,res)=>{
    try{
        let note = await noteModel.find()
        res.send(note)
    } catch(err){
        res.send({"msg":"Something went wrong"})
    }
})

noteRoute.post("/create",async(req,res)=>{
    const data = req.body
    try{
        const newNote = new noteModel(data)
        await newNote.save()
        res.send("Created successfully")
    }catch(err){
        res.send({"msg":"Something went wrong"})
    }
})


noteRoute.patch("/update/:id",async(req,res)=>{
    const id = req.params.id
    const data = req.body;
    const note = await noteModel.findOne({"_id":id})
    const userID_in_note = note.userID;
    const userID_maing_req = req.body.userID
    console.log(typeof userID_in_note,typeof userID_maing_req)
    try{
        if (userID_maing_req!==userID_in_note){
            res.send({"msg":"You are not authorised"})
        } else {
            await noteModel.findByIdAndUpdate({_id:id},data)
            res.send("Updated succesfully")
        }
    }catch(err){
        res.send({"msg":"Something went wrong"})
    }
})

noteRoute.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id
    try{
        await noteModel.findByIdAndDelete({_id:id})
        res.send("Updated succesfully")
    }catch(err){
        res.send({"msg":"Something went wrong"})
    }
})


module.exports={
    noteRoute
}