const contact = require("../models/contactModels")
const asyncHandler = require("express-async-handler")
//@desc Get All Contacts
//@route GET /api/contacts
//@access private
const getContact =  asyncHandler(async function(req,res){
    const contacts = await contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Create a Contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async function(req,res){
    console.log("Input is:", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("Missing One or More Fields");
    }

    const contacts = await contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contacts);
});

//@desc Get a Contact
//@route GET /api/contacts/:id
//@access private
const getOneContact = asyncHandler(async function(req,res){
    
    const contacts = await contact.findById(req.params.id);
    if (!contacts){
        res.status(404);
        throw new Error("Contact not Found");
    }

    res.status(200).json(contacts);
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async function(req,res){
    const contacts = await contact.findById(req.params.id);
    if (!contacts){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if (contacts.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User Not Authorized");
    }

    const updated = await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    

    res.status(200).json(updated);
});

//@desc Delete a Contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async function(req,res){

    const contacts = await contact.findById(req.params.id);
    if (!contacts){
        res.status(404);
        throw new Error("Contact not Found");
    }

    if (contacts.user_id.toString() != req.user.id){
        res.status(403);
        throw new Error("User Not Authorized");
    }
    
    await contact.deleteOne({_id:req.params.id});
    //Below works as well
    //const update = await contact.findByIdAndDelete(req.params.id);
    res.status(200).json(contacts);
});


module.exports = {getContact,createContact, getOneContact, updateContact, deleteContact};