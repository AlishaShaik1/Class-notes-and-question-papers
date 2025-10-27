// frontend/src/components/notes/NoteCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";

interface Note {
  _id: string;
  title: string;
  subject: string;
  courseYear: number;
  fileUrl: string;
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

  const handleDownload = () => {
    const filename = `${note.title.replace(/\s/g, "_")}-${note._id}.pdf`;
    const downloadLink = document.createElement("a");
    downloadLink.href = note.fileUrl;
    downloadLink.target = "_self";
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
        rotateX: 5,
        rotateY: -3,
      }}
      className="relative overflow-hidden rounded-2xl p-6 bg-white/50 backdrop-blur-xl border border-white/40 shadow-lg hover:shadow-2xl transition-all"
    >
      {/* Decorative gradient overlay */}
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

        {/* Download button */}
        <motion.button
          onClick={handleDownload}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 20px rgba(59,130,246,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r 
                     from-green-500 to-blue-500 text-white font-bold rounded-xl 
                     shadow-md hover:from-green-600 hover:to-blue-600 transition-all duration-300"
        >
          <Download className="w-5 h-5" /> Download PDF
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NoteCard;
