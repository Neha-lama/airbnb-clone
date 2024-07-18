const Listing=require("./models/listing");
const Review=require("./models/review");
const {listingSchema,reviewSchema}=require("./schema.js");
const ExpressError=require("./utils/ExpressError.js");

module.exports.isLoggedIn=(req,res,next)=>{
    //  console.log(req.path,"..",req.originalUrl);//we can check is the user logged in
        if(!req.isAuthenticated()){
            req.session.redirectUrl=req.originalUrl;
            req.flash("error", "you must be logged in to create listing!");
            res.redirect("/login");
        }
        next();
};

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
};



module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;

     let listing=await Listing.findById(id);
     if(!listing.owner.equals(res.locals.currUser._id)){
          req.flash("error","you are not the owner of the listing");
          return res.redirect(`/listings/${id}`);
     }
     next();
}



//middleware for schema validation
module.exports.validateListing=(req,res,next)=>{
               
    let {error}=listingSchema.validate(req.body);
  
     if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg);
     }else{
      next();
     }
  };





  module.exports.validateReview=(req,res,next)=>{
               
    let {error}=reviewSchema.validate(req.body);
  
     if(error){
      let errmsg=error.details.map((el)=>el.message).join(",");
      throw new ExpressError(400,errmsg);
     }else{
      next();
     }
  };



  module.exports.isreviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;

     let review=await Review.findById(reviewId);
     if(!review.author.equals(res.locals.currUser._id)){
          req.flash("error","you are not the author of the review");
          return res.redirect(`/listings/${id}`);
     }
     next();
}