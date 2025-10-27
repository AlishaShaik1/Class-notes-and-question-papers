// backend/src/middleware/upload.js

import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary'; 
import dotenv from 'dotenv';
dotenv.config();

// 1. Configure Cloudinary using environment variables
try {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  console.log('Cloudinary configured successfully');
} catch (error) {
  console.error('Cloudinary configuration error:', error);
}

// 2. Configure Multer to use Cloudinary Storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Determine the original extension safely (e.g., 'pdf')
    // We use .pop() to get the extension. We can't rely on the full file.originalname
    // as it can contain characters not suitable for the path.
    const fileExtension = file.originalname.split('.').pop();
    // Determine the base filename without extension
    const baseFilename = file.originalname.split('.')[0];
    
    console.log('Cloudinary storage params called for file:', file.originalname);
    
    return {
      folder: 'pec-notes', 
      resource_type: 'raw', // VITAL for non-image files like PDFs
      allowed_formats: ['pdf'],
      
      // FIX: Ensures file extension is present in Cloudinary's URL
      public_id: `${baseFilename}-${Date.now()}.${fileExtension}`, 
      
      // CRITICAL FIX: Explicitly setting the max file size for the Cloudinary API call
      max_file_size: 104857600 // 100 MB in bytes
    };
  }
});

// 3. File Filter (Ensures only PDFs are uploaded)
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true); 
    } else {
        req.fileValidationError = 'Only PDF files are allowed.';
        cb(null, false);
    }
};

// 4. Configure Multer (Internal limit for Express processing)
const upload = multer({ 
    storage: cloudinaryStorage, 
    fileFilter: pdfFilter,
    limits: { 
        // Sync Multer's internal file size limit to 100 MB
        fileSize: 1024 * 1024 * 100
    }
});

export const uploadPdf = upload.single('pdfFile');