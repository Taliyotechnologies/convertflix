import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ImageTools from './pages/tools/ImageTools';
import VideoTools from './pages/tools/VideoTools';
import PDFTools from './pages/tools/PDFTools';
import AudioTools from './pages/tools/AudioTools';
import About from './pages/About';
import Contact from './pages/Contact';
import Owner from './pages/Owner';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tools/image" element={<ImageTools />} />
            <Route path="/tools/video" element={<VideoTools />} />
            <Route path="/tools/pdf" element={<PDFTools />} />
            <Route path="/tools/audio" element={<AudioTools />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/owner" element={<Owner />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;
