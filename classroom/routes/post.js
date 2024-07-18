
const express=require("express");
const router=express.Router();


//Index
router.get("/",(req,res)=>{
    res.send("GET for post");
});



//show
router.get("/:id",(req,res)=>{
    res.send("GET for post id");
});

//post
router.post("/",(req,res)=>{
    res.send("post for post");
});


//DELETE
router.delete("/:id",(req,res)=>{
    res.send("DELETE for post id");
});

module.exports=router;