const Listing=require("../models/listing.js");
const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");





//index
module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("index.ejs",{allListings});
     };





 //new form

     module.exports.renderNewForm=(req,res)=>{
        res.render("new.ejs");
        };


//show
module.exports.showListing=async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");

    if(!listing){
        req.flash("error", "listing you requested for does not exist");
        res.redirect("/listings")
    }
    console.log(listing);
    res.render("show.ejs",{listing});
};




//create

module.exports.createListing=async(req,res,next)=>{
    // let {title,description,image,price,location,country}=req.body;
    // let listing=req.body.listing

    let url =req.file.path;
    let filename=req.file.filename;
    console.log(url,"..",filename);

//  const newListing=new Listing(req.body.listing);
//  newListing.owner=req.user._id;
//  await newListing.save();

 req.flash("success", "New Listing created!");
 res.redirect("/listings")
    };




//edit

module.exports.renderEditForm=async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);

if(!listing){
 req.flash("error", "listing you requested for does not exist");
 res.redirect("/listings")
}
res.render("edit.ejs",{listing});
};





//Update

module.exports.updateListing=async(req,res)=>
    {
      let {id}=req.params;

 await Listing.findByIdAndUpdate(id, {...req.body.listing});
 req.flash("success", "Listing updated!");
 res.redirect(`/listings/${id}`);
};






//delete

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    let deletedListings=await Listing.findByIdAndDelete(id);
    console.log(deletedListings);
    req.flash("success", "Listing deleted!");
    res.redirect("/listings");
};