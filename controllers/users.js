const User=require("../models/user.js");


//signup

module.exports.renderSignupForm= (req,res)=>{
    res.render("users/signup.ejs");
};


module.exports.signup=async(req,res,next)=>{
    let {username, email, password}=req.body;

    try{
    const newUser=new User({email, username});
    const registeredUser=await User.register(newUser, password);
    console.log(registeredUser);

     req.login(registeredUser,(err)=>{
          if(err){
           return next(err);
          }
          req.flash("success","Welcome to wanderLust!");
          res.redirect("/listings");
     });
    }catch(e){
       req.flash("error",e.message);
       res.redirect("/signup")
    }
};



//login

module.exports.renderLoginForm=(req,res,next)=>{
    res.render("users/login.ejs")
};

module.exports.login=async(req,res)=>{
       
    req.flash("success","Welcome back to WanderLust! You are Logged in!");
    let redirectUrl=res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};




//logout

module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
         if(err){
             return next(err);
         }
         req.flash("success","you are logged out!!");
         res.redirect("/listings");
    })        
};