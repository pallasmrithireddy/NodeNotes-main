import express from 'express';
import cors from 'cors';

const app = express();

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db.js';

// Connect to MongoDB
connectDB();

import Note from './noteModel.js'; // Import the Note model

// Middleware

app.use(cors());
app.use(express.json());

// Sample data for demonstration purposes

// let data = [
//     { id: 1, note: 'I am learning Node.js'},
//     { id: 2, note: 'I am learning Express.js'},
//     { id: 3, note: 'Why am I Alive?'},
// ];

// CRUD Operations
// C -> CREATE -> POST REQUEST
// R -> READ -> GET REQUEST
// U -> UPDATE -> PUT REQUEST
// D -> DELETE -> DELETE REQUEST

// API routes

// GET Request - READING DATA

app.get('/', async (req, res) => {
    // res.json(data);
    let notes = await Note.find(); // Fetch all notes from the database
    res.json(notes); // Send the notes as a JSON response
});

// POST Request - CREATING DATA
app.post('/', (req, res) => {
    // const { note } = req.body;
    // data.push({ id: data.length + 1, note });

    // // Send a response back to the client with status code 201 (Created) and a success message
    // res.status(201).send('Note added successfully!');

    const { note } = req.body;
    const newNote = new Note({
        content: note,
    });
    
    newNote.save().then(() => {
        res.status(201).send('Note added successfully!');
    }).catch((error) => {
        res.status(500).send('Error adding note: ' + error.message);
    });

});

// PUT Request

app.put('/', (req, res) => {
    const { id, note } = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = { id, note };
        res.send('Note updated successfully!');
    } else {
        res.status(404).send('Note not found.');
    }
});

// DELETE Request

app.delete('/', (req, res) => {
    const { id } = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data.splice(index, 1);
        res.send('Note deleted successfully.');
    } else {
        res.status(404).send('Note not found.');
    }
});



// Define the PORT number
const PORT = 3000; 

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});