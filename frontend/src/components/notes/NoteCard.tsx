// frontend/src/components/notes/NoteCard.tsx
import React from "react";
import { motion } from "framer-motion";
// Ensure you have lucide-react installed for the icons
import { Download, Eye } from "lucide-react"; 

interface Note {
  _id: string;
  title: string;
  subject: string;
  courseYear: number;
  fileUrl: string; // Permanent Cloudinary URL from MongoDB
  uploaderName: string;
  createdAt: string;
}

interface NoteCardProps {
  note: Note;
}

const NoteCard: React.FC<NoteCardProps> = ({ note }) => {
  
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // --- DOWNLOAD LOGIC (Blob Method for Automatic Save) ---
  const handleDownload = async () => {
    try {
      // 1. Open the PDF in a new tab (This is necessary to keep the current page open)
      window.open(note.fileUrl, "_blank");

      // 2. Fetch the file as a Blob (silent download in the background)
      const response = await fetch(note.fileUrl);
      const blob = await response.blob();

      // 3. Create a download link and trigger it (forces save dialog)
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Ensure file name is correct when saving locally
      link.download = note.title?.replace(/\s+/g, "_") + ".pdf"; 
      
      document.body.appendChild(link);
      link.click(); // Trigger the download prompt
      
      // 4. Clean up
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error downloading file:", err);
      // NOTE: We don't show an alert here, as the new tab opening usually succeeds
    }
  };
  
  // --- VIEW LOGIC (Simple New Tab Open) ---
  const handleView = () => {
      window.open(note.fileUrl, "_blank");
  };


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
      }}
      className="relative overflow-hidden rounded-2xl p-6 bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 to-blue-50/30 opacity-60 rounded-2xl -z-10" />

      <div className="flex flex-col h-full justify-between space-y-4">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2 line-clamp-2">
            {note.title}
          </h3>

          {/* Subject & Year tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-gray-900 shadow-sm">
              {note.subject}
            </span>
            <span className="px-3 py-1 text-sm font-semibold rounded-full bg-gradient-to-r from-indigo-300 to-blue-500 text-white shadow-sm">
              Year: {note.courseYear}
            </span>
          </div>

          {/* Uploader info */}
          <div className="text-gray-700 text-sm border-t border-gray-300/40 pt-3 space-y-1">
            <p>
              <span className="font-semibold text-gray-900">Uploaded By:</span>{" "}
              {note.uploaderName}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Uploaded On:</span>{" "}
              {formatDate(note.createdAt)}
            </p>
          </div>
        </div>

        {/* --- DUAL ACTION BUTTONS (View and Download) --- */}
        <div className="flex justify-between gap-3 mt-4">
            {/* View Button */}
            <motion.button
              onClick={handleView} // Calls the simple new tab open function
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 flex items-center justify-center gap-2 py-3 bg-indigo-500 text-white font-bold rounded-xl shadow-md hover:bg-indigo-600 transition-all duration-300"
            >
              <Eye className="w-5 h-5" /> View PDF
            </motion.button>
            
            {/* Download Button */}
            <motion.button
              onClick={handleDownload} // Calls the complex Blob function for auto-download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-1/2 flex items-center justify-center gap-2 py-3 bg-gradient-to-r 
                        from-green-500 to-blue-500 text-white font-bold rounded-xl 
                        shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-300"
            >
              <Download className="w-5 h-5" /> Download
            </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteCard;