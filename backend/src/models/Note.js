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
        // FIX: Removed 'min: 1' constraint to allow the value 0 for Exam Papers.
        chapter: { 
            type: Number,
            required: true,
            // REMOVED: min: 1, 
            max: 10, // Example validation limit
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
        fileType: {
            type: String,
            required: true,
            enum: ['Notes', 'Papers'], 
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