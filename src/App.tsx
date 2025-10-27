// frontend/src/App.tsx (Updated with Footer)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Library from './pages/Library';
import Upload from './pages/Upload';
import Footer from './components/layout/Footer'; // <--- NEW IMPORT

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col"> {/* Use flex-col */}
        <Navbar />
        {/* Main content area takes up remaining space */}
        <main className="flex-grow container mx-auto px-4 py-6"> 
          <Routes>
            {/* Set Library as the default landing page */}
            <Route path="/" element={<Library />} /> 
            <Route path="/library" element={<Library />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </main>
        <Footer /> {/* <--- NEW COMPONENT HERE */}
      </div>
    </Router>
  );
}

export default App;