const express = require("express");
const router = express.Router();
const { createBook, getBook, editBook, deleteBook, getAllBooks} = require("../controllers/book.controller.js");



//create
router.post("/",createBook);

// Update

router.put("/edit/:bookId",editBook);


//Read all users
router.get("/",getAllBooks);


//Read one user
router.get("/details/:bookId",getBook);

// Deleted

router.delete("/delete/:bookId",deleteBook);




module.exports = router;
