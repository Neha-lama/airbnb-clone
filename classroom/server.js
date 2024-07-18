const express=require("express")
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session = require( "express-session" );
const flash = require("connect-flash");
const path=require('path');
// const cookieParser=require("cookie-parser");

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));


const sessionOptions={
    secret:"mysupersecretstring",
     resave:false, 
     saveUninitialized:true,
};



app.use(session(sessionOptions));
app.use(flash());



app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    next();
});






app.get("/register", (req,res)=>{
     let {name="anonymous"}=req.query;
     req.session.name=name;

     if(name=="anonymous"){
        req.flash("success", "user not registered");
     }else{
        req.flash("error", "user registered successful");
     }

     res.redirect("/hello");
});





app.get("/hello",(req,res)=>{
    res.render("page.ejs", {name:req.session.name });
});


// app.use(session({secret:"mysupersecretstring", resave:false, saveUninitialized:true}));

// app.get("/reqcount", (req,res)=>{

//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
    
//     res.send(`you sent a request ${req.session.count} times`);
// })




// app.get("/test",(req,res)=>{
//     res.send('test successful!');
// });

// app.use(cookieParser("secretcode"));

// //signed cookie=means sealed cookie
// app.get("/getsignedcookies",(req,res)=>{
//     res.cookie("made-in","INDIA",{signed:true});
//     res.send("signed cookie sent")
    
// });



// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","hello");
//     res.send("sent you some cookie")
// });


// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`Hi ${name}`);
// })



// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi, Im root");
// });

// app.use("/users", users);
// app.use("/posts",posts);


app.listen(3000,()=>{
    console.log("server is listening t0 port 3000")
});