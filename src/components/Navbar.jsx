import React, { useState, useEffect } from 'react';
import github from '../assets/icon/github-logo.png';
import insta from '../assets/icon/insta.png';
import linkedin from '../assets/icon/linkedin.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  
  // Handle scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <nav 
      className={`fixed top-0 md:top-8 left-0 md:left-1/2 transform md:-translate-x-1/2 transition-all duration-500 ease-in-out w-full md:w-4/5 lg:w-3/5 h-16 bg-black md:rounded-3xl px-4 md:px-8 flex items-center shadow-gray-800 shadow-lg z-50 ${
        scrollPosition > 50 ? 'bg-black bg-opacity-90' : 'bg-black'
      }`}
    >
      <style>
        {`
          @keyframes rhythm1 { 0%, 100% { height: 8px; } 50% { height: 16px; } }
          @keyframes rhythm2 { 0%, 100% { height: 6px; } 50% { height: 20px; } }
          @keyframes rhythm3 { 0%, 100% { height: 10px; } 50% { height: 18px; } }
          @keyframes rhythm4 { 0%, 100% { height: 8px; } 50% { height: 22px; } }
          @keyframes rhythm5 { 0%, 100% { height: 12px; } 50% { height: 16px; } }
          
          .rhythm-1 { animation: rhythm1 1.2s ease-in-out infinite; }
          .rhythm-2 { animation: rhythm2 0.9s ease-in-out infinite; }
          .rhythm-3 { animation: rhythm3 1s ease-in-out infinite; }
          .rhythm-4 { animation: rhythm4 1.4s ease-in-out infinite; }
          .rhythm-5 { animation: rhythm5 0.8s ease-in-out infinite; }
        `}
      </style>

      <div className="flex justify-between w-full items-center transition-all duration-700 opacity-100 scale-100">
        {/* Social Media Icons - Hidden on mobile, visible on larger screens */}
        <ul className="hidden md:flex space-x-6">
          <li className='w-8 h-8'>
            <a className='w-8 h-8' href="https://github.com/AdityaZulkarnaen" target='blank'>
              <img src={github} alt="GitHub" className="w-8 h-8" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/adlkyzkrnn/">
              <img src={insta} alt="Instagram" className="w-8 h-8" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/aditya-zulkarnaen-7596142a8/">
              <img src={linkedin} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </li>
        </ul>

        {/* Mobile Logo/Name */}
        <div className="md:hidden text-white text-xl" style={{fontFamily: 'grand'}}>
          Adit
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-4 lg:space-x-8 text-white text-lg" style={{fontFamily: 'reg'}}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-[#e1ff00] transition-colors">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="hover:text-[#e1ff00] transition-colors">Skills</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-[#e1ff00] transition-colors">Projects</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="hover:text-[#e1ff00] transition-colors">Experience</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-[#e1ff00] transition-colors">Contact</a>
        </div>

        {/* Mobile Hamburger Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black bg-opacity-95 md:hidden transition-all duration-300 ease-in-out z-50">
          <div className="flex flex-col items-center py-6 space-y-4 text-white text-lg" style={{fontFamily: 'reg'}}>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-[#e1ff00] transition-colors">Home</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="hover:text-[#e1ff00] transition-colors">Skills</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-[#e1ff00] transition-colors">Projects</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="hover:text-[#e1ff00] transition-colors">Experience</a>
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-[#e1ff00] transition-colors">Contact</a>
            
            {/* Social Media Icons for Mobile */}
            <div className="flex space-x-6 pt-4">
              <a href="https://github.com/AdityaZulkarnaen" target='blank'>
                <img src={github} alt="GitHub" className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/adlkyzkrnn/">
                <img src={insta} alt="Instagram" className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/aditya-zulkarnaen-7596142a8/">
                <img src={linkedin} alt="LinkedIn" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;