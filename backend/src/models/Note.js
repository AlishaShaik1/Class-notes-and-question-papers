// backend/src/models/Note.js
import mongoose from 'mongoose';

const noteSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        // FIX 1: Remove 'min: 1' to allow the value 0 for non-chaptered content (Papers/Assignments).
        chapter: { 
            type: Number,
            required: true,
            max: 10, // Max validation limit remains
        },
        courseYear: {
            type: Number,
            required: true,
        },
        fileUrl: {
            // This URL will point to the PDF file in Cloud Storage
            type: String,
            required: true,
        },
        // FIX 2: Add 'Assignments' to the allowed list (enum)
        fileType: {
            type: String,
            required: true,
            enum: ['Notes', 'Papers', 'Assignments'], 
        },
        uploaderName: {
            // The name entered by the user
            type: String,
            required: true,
            default: 'Anonymous',
            maxlength: 50,
        },
    },
    {
        timestamps: true, // Automatically adds 'createdAt' and 'updatedAt'
    }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;