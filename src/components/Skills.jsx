import {useEffect, useState} from 'react';
import github from '../assets/icon/github-logo.png';
import react from '../assets/icon/react.svg';
import tailwind from '../assets/icon/tailwind.svg';
import express from '../assets/icon/express.svg';
import js from '../assets/icon/javascript.svg';
import sql from '../assets/icon/sql.svg';
import html from '../assets/icon/html-1.svg';
import css from '../assets/icon/css.svg';
import figma from '../assets/icon/figma.svg';
import python from '../assets/icon/python.svg';
import expo from '../assets/icon/expo.svg';
import next from '../assets/icon/next.svg';

const SkillItem = ({ icon, name }) => (
  <div className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] h-12 sm:h-14 border-purple-950 border-2 rounded-xl text-white mb-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-md hover:shadow-purple-900">
    <div className='flex items-center h-full text-base sm:text-lg' style={{fontFamily:'pp'}}>
      <img className='w-8 h-8 ml-3 mr-3' src={icon} alt={name} />
      {name}
    </div>
  </div>
);

const Skills = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
    useEffect(() => {
      // Simulasi loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);
  const skillsList = [
    { icon: html, name: 'HTML' },
    { icon: css, name: 'CSS' },
    { icon: js, name: 'JavaScript' },
    { icon: python, name: 'Python' },
    { icon: react, name: 'React JS' },
    { icon: tailwind, name: 'Tailwind' },
    { icon: express, name: 'Express' },
    { icon: sql, name: 'SQL' },
    { icon: figma, name: 'Figma' },
    { icon: expo, name: 'Expo' },
    { icon: github, name: 'Github' },
    { icon: next, name: 'Next JS' }
  ];

  return (
    <section id="skills" className={`w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20 transition-all duration-700 ${!isLoaded ? 'blur-xl' : 'blur-none'}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center mb-12 md:mb-16" style={{fontFamily: 'grand'}}>
          My Specialities
        </h2>
        
        <div className="flex flex-wrap justify-between lg:gap-10 md:gap-4">
          {skillsList.map((skill, index) => (
            <SkillItem key={index} icon={skill.icon} name={skill.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;