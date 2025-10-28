// frontend/src/pages/Library.tsx
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; 
import NoteCard from '../components/notes/NoteCard';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/notes`;

interface Note {
    _id: string;
    title: string;
    subject: string;
    courseYear: number;
    fileUrl: string;
    fileType: 'Notes' | 'Papers'; 
    uploaderName: string;
    createdAt: string;
}

const Library: React.FC = () => {
    const [allNotes, setAllNotes] = useState<Note[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'Notes' | 'Papers'>('Notes');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    const SUBJECTS = ['M3', 'ADSA', 'AI', 'Java', 'Python', 'UHV', 'ES'];

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get<Note[]>(API_URL);
                setAllNotes(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch notes. Please ensure the backend server is running.');
                setLoading(false);
            }
        };
        fetchNotes();
    }, []);

    const filteredNotes = useMemo(() => {
        let notesToFilter = allNotes;
        
        notesToFilter = notesToFilter.filter(note => note.fileType === filterType);
        
        if (selectedSubject && filterType === 'Notes') {
            notesToFilter = notesToFilter.filter(note => note.subject === selectedSubject);
        }
        
        const lowerCaseSearch = searchTerm.toLowerCase();
        
        return notesToFilter.filter(note => 
            note.title.toLowerCase().includes(lowerCaseSearch) ||
            note.subject.toLowerCase().includes(lowerCaseSearch) ||
            note.uploaderName.toLowerCase().includes(lowerCaseSearch)
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
    }, [allNotes, searchTerm, filterType, selectedSubject]);


    if (loading) {
        return <div className="text-center text-2xl text-pec-blue mt-20">Loading amazing content...</div>;
    }

    const renderContent = () => {
        if (error) {
            return <div className="text-center text-xl text-red-600 mb-8">{error}</div>;
        }

        if (filteredNotes.length === 0) {
            const context = selectedSubject ? ` for ${selectedSubject}` : '';
            return (
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-xl text-gray-500 p-10 mt-10 border-4 border-dashed border-pec-yellow rounded-2xl bg-white shadow-lg"
                >
                    {searchTerm ? 
                        `No results found for "${searchTerm}" in ${filterType}.` : 
                        `No ${filterType.toLowerCase()} available${context} yet.`}
                </motion.div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredNotes.map((note) => (
                    <NoteCard key={note._id} note={note} />
                ))}
            </div>
        );
    };

    return (
        <div className="py-12">
            
            {/* --- TOP HEADER & SECTION TOGGLES (ALWAYS VISIBLE) --- */}
            <motion.div 
                initial={{ y: -50, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.6 }}
                className="text-center mb-12 bg-white p-6 rounded-xl shadow-2xl"
            >
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                    {filterType === 'Notes' ? '📚 Class Notes' : '📝 Previous Exam Papers'}
                </h1>
                
                {/* Section Toggle Buttons (ALWAYS VISIBLE) */}
                <div className="flex justify-center space-x-4 mb-6">
                    <motion.button
                        onClick={() => {
                            setFilterType('Notes');
                            setSelectedSubject(null); // Reset subject when changing section
                        }}
                        className={`px-6 py-3 text-lg font-bold rounded-full transition-all duration-300 shadow-xl ${
                            filterType === 'Notes' ? 'bg-pec-green text-white scale-105' : 'bg-gray-200 text-gray-700 hover:bg-pec-green/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        Class Notes
                    </motion.button>
                    <motion.button
                        onClick={() => {
                            setFilterType('Papers');
                            setSelectedSubject(null); // Reset subject when changing section
                        }}
                        className={`px-6 py-3 text-lg font-bold rounded-full transition-all duration-300 shadow-xl ${
                            filterType === 'Papers' ? 'bg-pec-blue text-white scale-105' : 'bg-gray-200 text-gray-700 hover:bg-pec-blue/50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        Exam Papers
                    </motion.button>
                </div>

                 {/* Search Bar - Visible in both views */}
                <input 
                    type="text" 
                    placeholder={`Search within ${filterType}...`} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-3/4 p-3 border-2 border-pec-yellow rounded-xl focus:ring-pec-blue focus:border-pec-blue transition duration-200 shadow-inner"
                />
            </motion.div>
            
            
            {/* --- DYNAMIC VIEW SWITCHING --- */}
            
            {/* A. NOTES - Subject Folder View (Now using the book icon) */}
            {filterType === 'Notes' && !selectedSubject && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ staggerChildren: 0.1 }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    {SUBJECTS.map(subject => (
                        <motion.button
                            key={subject}
                            onClick={() => setSelectedSubject(subject)}
                            className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-pec-yellow"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* REPLACED FOLDER ICON WITH MODERN BOOK ICON */}
                            <span className="text-5xl mb-2 text-pec-blue">📚</span>
                            <span className="text-lg font-bold text-gray-800">{subject}</span>
                            <span className="text-sm text-gray-500">View Notes</span>
                        </motion.button>
                    ))}
                </motion.div>
            )}

            {/* B. PAPERS - Direct List View (No Folders) */}
            {filterType === 'Papers' && renderContent()}


            {/* C. NOTES - Specific Subject List View */}
            {filterType === 'Notes' && selectedSubject && (
                <motion.div 
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                >
                    <div className="flex justify-between items-center mb-6">
                        <motion.button 
                            onClick={() => setSelectedSubject(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-md hover:bg-gray-300 transition duration-200"
                            whileHover={{ scale: 1.05 }}
                        >
                            ← Back to Subjects
                        </motion.button>
                        <h2 className="text-2xl font-bold text-pec-blue">{selectedSubject} Notes</h2>
                        <div></div> {/* Spacer */}
                    </div>

                    {renderContent()}
                </motion.div>
            )}
        </div>
    );
};

export default Library;