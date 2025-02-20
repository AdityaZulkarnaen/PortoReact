import React, { useState } from 'react';
import github from '../assets/github-logo.png';
import insta from '../assets/insta.png';
import linkedin from '../assets/linkedin.svg';

const Navbar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav 
      className={`fixed top-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 ease-in-out 
        ${isHovered 
          ? 'w-3/5 h-20 bg-black rounded-3xl px-8' 
          : 'w-48 h-10 bg-black rounded-[20px] p-2'
        } flex items-center shadow-gray-800 shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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

      <div className={`flex justify-between w-full items-center transition-all duration-500
        ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <ul className="flex space-x-6">
          <li className='w-10 h-10'>
            <a className='w-10 h-10' href="https://github.com/AdityaZulkarnaen" target='blank'>
              <img src={github} alt="GitHub" className="w-10 h-10" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/adlkyzkrnn/">
              <img src={insta} alt="Instagram" className="w-10 h-10" />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/aditya-zulkarnaen-7596142a8/">
              <img src={linkedin} alt="LinkedIn" className="w-10 h-10" />
            </a>
          </li>
        </ul>

        <div className="flex space-x-10 text-white text-xl">
          <a href="">Home</a>
          <a href="">Skills</a>
          <a href="">Projects</a>
          <a href="">Contact Me</a>
        </div>
      </div>

      {/* Dynamic Island style collapsed state */}
      <div className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 
        transition-all duration-400 w-full flex items-center gap-25 ml-3
        ${isHovered ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="flex">
          <div className="w-5 h-5 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Rhythm Bars */}
        <div className="flex gap-1 items-center h-6">
          <div className="w-1 bg-white rounded-full rhythm-1"></div>
          <div className="w-1 bg-white rounded-full rhythm-2"></div>
          <div className="w-1 bg-white rounded-full rhythm-3"></div>
          <div className="w-1 bg-white rounded-full rhythm-4"></div>
          <div className="w-1 bg-white rounded-full rhythm-5"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;