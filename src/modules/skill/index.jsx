import { useState, useEffect } from 'react';
import { DataService } from '../../admin/services/dataService';
import github from '../../assets/icon/github-logo.png';
import react from '../../assets/icon/react.svg';
import tailwind from '../../assets/icon/tailwind.svg';
import express from '../../assets/icon/express.svg';
import js from '../../assets/icon/javascript.svg';
import sql from '../../assets/icon/sql.svg';
import html from '../../assets/icon/html-1.svg';
import css from '../../assets/icon/css.svg';
import figma from '../../assets/icon/figma.svg';
import python from '../../assets/icon/python.svg';
import expo from '../../assets/icon/expo.svg';
import next from '../../assets/icon/next.svg';

const fallbackSkills = [
  { id: 'html',     icon: html,     name: 'HTML' },
  { id: 'css',      icon: css,      name: 'CSS' },
  { id: 'js',       icon: js,       name: 'JavaScript' },
  { id: 'python',   icon: python,   name: 'Python' },
  { id: 'react',    icon: react,    name: 'React JS' },
  { id: 'tailwind', icon: tailwind, name: 'Tailwind' },
  { id: 'express',  icon: express,  name: 'Express' },
  { id: 'sql',      icon: sql,      name: 'SQL' },
  { id: 'figma',    icon: figma,    name: 'Figma' },
  { id: 'expo',     icon: expo,     name: 'Expo' },
  { id: 'github',   icon: github,   name: 'Github' },
  { id: 'next',     icon: next,     name: 'Next JS' },
];



const SkillItem = ({ icon, name }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-[#e1ff00] text-white shrink-0 transition-all duration-300">
    <img className="w-18 h-18 md:w-20 md:h-20 object-contain brightness-0 invert" src={icon} alt={name} />
    {/* <span className="text-base whitespace-nowrap" style={{ fontFamily: 'pp' }}>{name}</span> */}
  </div>
);

const MarqueeRow = ({ skills, direction = 'left', speed = 30 }) => {
  // Duplicate enough times to fill screen seamlessly
  const repeated = [...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills, ...skills];
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="overflow-hidden w-full">
      <div className={`flex gap-4 w-max ${animClass}`} style={{ '--speed': `${speed}s` }}>
        {repeated.map((skill, i) => (
          <SkillItem key={i} icon={skill.icon} name={skill.name} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState(fallbackSkills);

  useEffect(() => {
    const loadSkills = async () => {
      const result = await DataService.getSkills();
      if (result.success && result.data && result.data.length > 0) {
        const mapped = result.data.map(s => ({
          id: s.id,
          icon: s.icon_url || s.icon_path,
          name: s.name,
        }));
        setSkills(mapped);
      }
      // on failure or empty, keep fallback
    };
    loadSkills();
  }, []);

  return (
    <section id="skills" className="w-full min-h-screen py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center mb-16" style={{ fontFamily: 'grand' }}>
          My Specialities
        </h2>
      </div>

      <div className="flex flex-col gap-5 mt-32">
        <MarqueeRow skills={skills} direction="left"  speed={75} />
        <MarqueeRow skills={skills} direction="right" speed={90} />
        <MarqueeRow skills={skills} direction="left"  speed={85} />
      </div>
    </section>
  );
};

export default Skills;