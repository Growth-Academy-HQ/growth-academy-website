import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import CaseStudies from './pages/CaseStudies';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import DropboxCaseStudy from './pages/case-studies/dropbox';
import AirbnbCaseStudy from './pages/case-studies/airbnb';
import LinkedInCaseStudy from './pages/case-studies/linkedin';
import './styles/globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <div className="app">
                <Header /> 
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/case-studies" element={<CaseStudies />} />
                        <Route path="/case-studies/dropbox" element={<DropboxCaseStudy />} />
                        <Route path="/case-studies/airbnb" element={<AirbnbCaseStudy />} />
                        <Route path="/case-studies/linkedin" element={<LinkedInCaseStudy />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;