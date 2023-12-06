const express = require("express");
const router = express.Router();
//need {} for functions, ../ goes up a folder
const {getContact, createContact, getOneContact, updateContact, deleteContact} = require("../controllers/contactController");
const { validateToken } = require("../midWare/validateTokenHandler");

router.use(validateToken);
//Use "/" cuz in server.js we use .use and pass in the path can combine first 2/last 3 by doing .get().post etc (already combined)
router.route("/").get( getContact).post( createContact);

router.route("/:id").get( getOneContact ).put( updateContact).delete( deleteContact);

//Exports for use outside of file
module.exports = router;