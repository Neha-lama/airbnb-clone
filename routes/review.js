const express=require("express");
const router=express.Router({mergeParams:true});


const wrapAsync=require("../utils/wrapAsyc.js");
const {validateReview, isLoggedIn, isreviewAuthor}=require("../middleware.js");
const reviewController=require("../controllers/reviews.js");






//Reviews
//post route
router.post("/",
    isLoggedIn,
    validateReview, 
    wrapAsync(reviewController.createReview));


//Delete route of review
router.delete("/:reviewId",
    isLoggedIn,
    isreviewAuthor,
    wrapAsync(reviewController.destroyReview));


module.exports=router;
