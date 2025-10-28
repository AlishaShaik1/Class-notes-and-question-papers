import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE_URL}/api/notes`;

const FileUploadForm: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [chapter, setChapter] = useState('');
    const [courseYear, setCourseYear] = useState('');
    const [uploaderName, setUploaderName] = useState('');
    const [fileType, setFileType] = useState('');
    const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | '' }>({ text: '', type: '' });
    const [loading, setLoading] = useState(false);

    const SUBJECTS = ['M3', 'ADSA', 'AI', 'Java', 'Python', 'UHV', 'ES'];
    const CHAPTERS = [1, 2, 3, 4, 5];

    // --- Submit Logic ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage({ text: '', type: '' });

        if (!file || !title || !courseYear || !uploaderName || !fileType) {
            setMessage({ text: 'Please fill out all required fields.', type: 'error' });
            return;
        }

        if (fileType === 'Notes' && (!subject || !chapter)) {
            setMessage({ text: 'Please select subject and chapter for notes.', type: 'error' });
            return;
        }

        if (file.type !== 'application/pdf') {
            setMessage({ text: 'Only PDF files are allowed.', type: 'error' });
            return;
        }

        const formData = new FormData();
        formData.append('pdfFile', file);
        formData.append('title', title);
        formData.append('courseYear', courseYear);
        formData.append('uploaderName', uploaderName);
        formData.append('fileType', fileType);

        if (fileType === 'Notes') {
            formData.append('subject', subject);
            formData.append('chapter', chapter);
        }

        setLoading(true);
        try {
            await axios.post(API_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setMessage({ text: 'Upload successful! Your classmates can now download it.', type: 'success' });

            // Reset form
            setFile(null);
            setTitle('');
            setSubject('');
            setChapter('');
            setCourseYear('');
            setUploaderName('');
            setFileType('');
            (document.getElementById('file-input') as HTMLInputElement).value = '';
        } catch (error) {
            console.error(error);
            setMessage({ text: 'Upload failed. Check backend status and console.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    // --- Animations ---
    const fieldVariant = {
        hidden: { opacity: 0, y: 15 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: i * 0.1, duration: 0.3 },
        }),
    };

    const alertClasses =
        message.type === 'success'
            ? 'bg-pec-green/10 border-pec-green text-pec-green'
            : 'bg-red-500/10 border-red-500 text-red-700';

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.1 } },
            }}
            className="bg-white p-6 md:p-10 rounded-xl shadow-2xl space-y-6 max-w-lg mx-auto border border-gray-200"
        >
            {/* Header */}
            <motion.h3
                variants={fieldVariant}
                custom={0}
                className="text-3xl font-extrabold text-center text-pec-blue"
            >
                📤 SHARE YOUR NOTES
            </motion.h3>

            {/* Message */}
            {message.text && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`p-3 border-l-4 rounded-md font-medium ${alertClasses}`}
                >
                    {message.text}
                </motion.div>
            )}

            {/* ✅ Content Type First */}
            <motion.div variants={fieldVariant} custom={1}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content Type:</label>
                <motion.select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pec-blue focus:border-pec-blue transition"
                    required
                >
                    <option value="">-- Select Type --</option>
                    <option value="Notes">Class Notes</option>
                    <option value="Papers">Previous Exam Papers</option>
                </motion.select>
            </motion.div>

            {/* File Input */}
            <motion.div variants={fieldVariant} custom={2}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select PDF File (Max 10MB)</label>
                <motion.input
                    id="file-input"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                    whileHover={{ scale: 1.02 }}
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pec-blue/10 file:text-pec-blue hover:file:bg-pec-blue/20"
                    required
                />
            </motion.div>

            {/* Title */}
            <motion.input
                variants={fieldVariant}
                custom={3}
                type="text"
                placeholder={fileType === 'Papers' ? 'e.g. Mid Sem 2024 Question Paper' : 'e.g. Module 3 Handout'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pec-blue focus:border-pec-blue transition"
                required
            />

            {/* ✅ Subject & Chapter only if Notes — fixed flicker & delay */}
            {fileType === 'Notes' && (
                <motion.div
                    key="notes-fields"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.1 }} // ⚡ super quick fade-in
                    className="space-y-4"
                >
                    {/* Subject */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Subject:</label>
                        <motion.select
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            whileHover={{ scale: 1.02 }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pec-blue focus:border-pec-blue transition"
                            required
                        >
                            <option value="">-- Select Subject --</option>
                            {SUBJECTS.map((sub) => (
                                <option key={sub} value={sub}>
                                    {sub}
                                </option>
                            ))}
                        </motion.select>
                    </div>

                    {/* Chapter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Chapter:</label>
                        <motion.select
                            initial={false}
                            animate={{ opacity: 1, y: 0 }}
                            value={chapter}
                            onChange={(e) => setChapter(e.target.value)}
                            whileHover={{ scale: 1.02 }}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pec-blue focus:border-pec-blue transition"
                            required
                        >
                            <option value="">-- Select Chapter --</option>
                            {CHAPTERS.map((ch) => (
                                <option key={ch} value={`Chapter ${ch}`}>
                                    {`Chapter ${ch}`}
                                </option>
                            ))}
                        </motion.select>
                    </div>
                </motion.div>
            )}

            {/* Course Year */}
            <motion.input
                variants={fieldVariant}
                custom={6}
                type="number"
                placeholder="Course Year (e.g., 2025)"
                value={courseYear}
                onChange={(e) => setCourseYear(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pec-blue focus:border-pec-blue transition"
                required
            />

            {/* Uploader Name */}
            <motion.input
                variants={fieldVariant}
                custom={7}
                type="text"
                placeholder="Your Name (Uploader)"
                value={uploaderName}
                onChange={(e) => setUploaderName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-pec-blue focus:border-pec-blue transition"
                required
            />

            {/* Submit Button */}
            <motion.button
                variants={fieldVariant}
                custom={8}
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.03 }}
                whileTap={{ scale: loading ? 1 : 0.97 }}
                className={`w-full py-3 px-4 rounded-lg text-white font-bold transition duration-300 ${
                    loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pec-green hover:bg-pec-blue'
                }`}
            >
                {loading ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center space-x-2"
                    >
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                            className="inline-block h-3 w-3 bg-white rounded-full"
                        />
                        <span>Please wait, file is uploading...</span>
                    </motion.span>
                ) : (
                    'Upload & Share'
                )}
            </motion.button>
        </motion.form>
    );
};

export default FileUploadForm;
