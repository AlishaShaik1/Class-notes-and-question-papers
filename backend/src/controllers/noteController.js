// backend/src/controllers/noteController.js

import Note from '../models/Note.js';
import { v2 as cloudinary } from 'cloudinary'; 

// -----------------------------------------------------------------------
// @desc    Upload a new PDF note
// @route   POST /api/notes
// @access  Public
export const uploadNote = async (req, res) => {
    // Debugging logs (Good for development)
    console.log('uploadNote called');
    console.log('req.file:', req.file);
    console.log('req.body:', req.body);
    
    if (req.fileValidationError) {
        console.log('File validation error:', req.fileValidationError);
        return res.status(400).json({ message: req.fileValidationError });
    }

    if (!req.file) {
        console.log('No req.file found - Upload failed upstream (Cloudinary/Multer)');
        return res.status(500).json({ message: 'File upload failed or file object is missing.' });
    }

    // 3. Extract all required metadata fields
    const { 
        title, 
        subject, 
        courseYear, 
        uploaderName, 
        fileType,
        chapter // <-- Successfully extracted from req.body
    } = req.body; 
    
    // CRITICAL FIX: Convert chapter and courseYear from String to Number
    // Use parseInt() with radix 10 for safe conversion
    const chapterNum = parseInt(chapter, 10);
    const yearNum = parseInt(courseYear, 10);

    // Get the public URL from the Cloudinary upload result. 
    const fileUrl = req.file.path; 

    // Safety check for required metadata (now checking for valid numbers/existence)
    if (!title || !subject || isNaN(yearNum) || !fileType || isNaN(chapterNum) || !uploaderName) { 
        console.log('Validation Failed: Missing required data or Chapter/Year is not a valid number.');
        // Log the invalid data for easier debugging if it fails
        console.log(`Debug Data Check: Chapter=${chapter}, Year=${courseYear}`);
        return res.status(400).json({ message: 'Missing required data or Chapter/Year is invalid.' });
    }

    try {
        const note = new Note({
            title,
            subject,
            courseYear: yearNum, // <-- SAVING CONVERTED NUMBER
            fileUrl, 
            fileType, 
            chapter: chapterNum, // <-- SAVING CONVERTED NUMBER
            uploaderName: uploaderName || 'Anonymous', 
        });

        const createdNote = await note.save();
        res.status(201).json(createdNote); // Success!

    } catch (error) {
        // This generally catches MongoDB saving errors
        console.error('Database save error:', error.message);
        res.status(500).json({ message: 'Failed to save note metadata.', error: error.message });
    }
};

// -----------------------------------------------------------------------
// @desc    Fetch all notes
// @route   GET /api/notes
// @access  Public
export const getNotes = async (req, res) => {
    try {
        // Sorts by 'createdAt' field in descending order (-1) to show newest files first
        const notes = await Note.find({}).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch notes.', error: error.message });
    }
};

// -----------------------------------------------------------------------
// @desc    Download a specific note file
// @route   GET /api/notes/download/:id
// @access  Public
export const downloadNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            // CRITICAL: Redirect the user directly to the permanent Cloudinary URL.
            return res.redirect(note.fileUrl); 
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error processing download request.', error: error.message });
    }
};

// -----------------------------------------------------------------------
// @desc    Delete a note by ID
// @route   DELETE /api/notes/:id
// @access  Admin Only (Manually triggered)
export const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            // Deletes the record from MongoDB
            await Note.deleteOne({ _id: req.params.id });
            res.json({ message: 'Note removed from database.' });
        } else {
            res.status(404).json({ message: 'Note not found in database.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete note.', error: error.message });
    }
};