import React from 'react'
import github from '../assets/github-logo.png'
import insta from '../assets/insta.png'
import linkedin from '../assets/linkedin.svg'

const Navbar = () => {
  return (
    <nav className="fixed top-8 left-1/2 transform -translate-x-1/2 w-3/5 h-20 bg-black rounded-3xl flex items-center px-8 shadow-gray-800 shadow-lg">
      <div className="flex justify-between w-full items-center">
        <ul className="flex space-x-6">
          <li>
            <a href="">
              <img src={github} alt="GitHub" className="w-10 h-10" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={insta} alt="Instagram" className="w-10 h-10" />
            </a>
          </li>
          <li>
            <a href="">
              <img src={linkedin} alt="LinkedIn" className="w-10 h-10" />
            </a>
          </li>
        </ul>

        {/* Bagian Kanan: Menu Navigasi */}
        <div className="flex space-x-10 text-white text-xl">
          <a href="">Home</a>
          <a href="">Skills</a>
          <a href="">Projects</a>
          <a href="">Contact Me</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
