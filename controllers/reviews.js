const Review=require("../models/review");
const Listing=require("../models/listing");



//post
module.exports.createReview=async(req,res)=>{
    let listing=await Listing.findById(req.params.id);
    let newReview=new Review(req.body.review);
    newReview.author=req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New review created!");

   res.redirect(`/listings/${listing._id}`)
};



//delete
module.exports.destroyReview=async(req,res)=>{
    let {id, reviewId}=req.params;
   
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})  //Here PULL is used to pull reviewId from review
    await Review.findByIdAndDelete(reviewId);
   
    req.flash("success", "review deleted!");
   
    res.redirect(`/listings/${id}`);
   };