// backend/src/routes/noteRoutes.js (FINAL CODE with Error Wrapper)
import express from 'express';
import { uploadNote, getNotes, deleteNote } from '../controllers/noteController.js'; 
import { uploadPdf } from '../middleware/upload.js'; 

const router = express.Router();

// --- Main Route for GET and POST (Upload) ---
router
    .route('/')
    // GET /api/notes - Fetches all notes
    .get(getNotes)
    // POST /api/notes - Handles file upload and metadata saving
    .post((req, res, next) => {
        // Wrapper function to explicitly handle Multer/Cloudinary errors
        uploadPdf(req, res, function (err) {
            if (err) {
                // LOG THE CRITICAL ERROR to the terminal for diagnosis
                console.error("--- CRITICAL CLOUDINARY UPLOAD ERROR DETECTED ---");
                console.error("Cause:", err.message); 
                console.error("--- END CRITICAL LOG ---");
                
                // If the error is related to Multer or Cloudinary credentials
                // Send a specific 500 response to the frontend
                return res.status(500).json({ 
                    message: "Upload failed: Server error during file processing.", 
                    detail: "Check backend console for Cloudinary credential or configuration issues."
                });
            }
            // If uploadPdf middleware succeeded (no 'err'), pass control to the next function
            next(); 
        });
    }, uploadNote); // Pass successful control to the uploadNote controller

// --- Delete Route ---
router.route('/:id')
    .delete(deleteNote); 

export default router;