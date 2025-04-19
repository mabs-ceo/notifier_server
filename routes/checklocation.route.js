const express = require('express')
const route = express.Router()

route.get("/",(req,res)=>{
    res.status(201).json({ allowed: true });
})

module.exports=route