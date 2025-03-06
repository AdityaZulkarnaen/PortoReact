import React, { useState } from 'react';
import github from '../assets/icon/github-logo.png';
import insta from '../assets/icon/insta.png';
import linkedin from '../assets/icon/linkedin.svg';

const Navbar = () => {
  // Smooth scroll function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className="fixed top-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out w-3/5 h-16 bg-black rounded-3xl px-8 flex items-center shadow-gray-800 shadow-lg z-50"
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
        <ul className="flex space-x-6">
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

        <div className="flex space-x-8 text-white text-lg" style={{fontFamily: 'reg'}}>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-[#e1ff00] transition-colors">Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="hover:text-[#e1ff00] transition-colors">Skills</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-[#e1ff00] transition-colors">Projects</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('experience'); }} className="hover:text-[#e1ff00] transition-colors">Experience</a>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-[#e1ff00] transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;