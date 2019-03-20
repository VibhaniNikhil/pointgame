var userRouter = require('express').Router();
var userService=require('./userService')

userRouter.get("/getCurrent/:id",(req,res)=>{
    userService.getCurrent(req,res)
})

userRouter.post("/addLocation",(req,res)=>{
    userService.addLocation(req,res)
})

userRouter.get("/getOneUser/:id",(req,res)=>{
    userService.getOneUser(req,res)
})

userRouter.put("/updateUser/:id",(req,res)=>{
    userService.updateUser(req,res)
})

module.exports = userRouter;