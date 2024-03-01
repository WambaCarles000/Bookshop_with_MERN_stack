const express = require("express");
const router = express.Router();
const { Book } = require('../models/models');


// Create a book
module.exports.createBook = async (req, res) => {
    try {

        console.log('Received request body:', req.body);
        const { title, author, publishYear } = req.body;
    
        // Validate required fields
        if (!title || !author || !publishYear) {
          return res.status(400).json({ error: 'Title, author, and publishYear are required fields.' });
        }
    
        // Create a new book instance
        const newBook = new Book({ title, author, publishYear });
    
        // Save the book to the database
        await newBook.save();
    
        res.status(201).json({ message: 'Book created successfully.' , Data:newBook});
      } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
};

// Read all books
module.exports.getAllBooks =async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({ data: books });
    } catch (error) {
        console.error('Error fetching boooks:', error);
        res.status(500).json({ message: 'Failed to fetch books' });
    }
};

// Read a specific book by ID
module.exports.getBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ data: book });
    } catch (error) {
        console.error('Error fetching category by ID:', error);
        res.status(500).json({ message: 'Failed to fetch book by ID' });
    }
};

// Update a book by ID
module.exports.editBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.bookId,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({ message: 'Book updated successfully', data: updatedBook });
    } catch (error) {
        console.error('Error updating book:', error);
        res.status(500).json({ message: 'Failed to update book' });
    }
};

// Delete a book by ID
module.exports.deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book deleted successfully', data: deletedBook });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ message: 'Failed to delete book' });
    }
};

