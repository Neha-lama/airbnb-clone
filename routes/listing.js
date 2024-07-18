const express=require("express");
const router=express.Router();

const wrapAsync=require("../utils/wrapAsyc.js");
const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listing.js");
const multer  = require('multer');
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage});

  
router.route("/")
//INDEX ROUTE
.get(wrapAsync(listingController.index))
//CREATE ROUTE
.post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing));


    //NEW ROUTE
router.get("/new",isLoggedIn,listingController.renderNewForm)



router.route("/:id")
//SHOW ROUTE
.get(wrapAsync(listingController.showListing))
//update
.put(
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing))
//delete
.delete(
        isLoggedIn,
        isOwner,
        wrapAsync(listingController.destroyListing));




//EDIT ROUTE
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.renderEditForm));



module.exports=router;