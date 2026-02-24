import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const ParallaxRow = ({ skills, x, reversed = false }) => {
  const ordered = reversed ? [...skills].reverse() : skills;
  const repeated = [...ordered, ...ordered, ...ordered, ...ordered, ...ordered, ...ordered, ...ordered, ...ordered];
  return (
    <motion.div style={{ x }} className="flex gap-4 w-max">
      {repeated.map((skill, i) => (
        <SkillItem key={i} icon={skill.icon} name={skill.name} />
      ))}
    </motion.div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState(fallbackSkills);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const xRow1 = useTransform(scrollYProgress, (v) => v * (window.innerWidth < 768 ? -900 : -300));
  const xRow2 = useTransform(scrollYProgress, (v) => -600 + v * (window.innerWidth < 768 ? 850 : 300));
  const xRow3 = useTransform(scrollYProgress, (v) => v * (window.innerWidth < 768 ? -800 : -200));

  const shuffledSkills = useMemo(() => {
    return [...skills].sort(() => Math.random() - 0.5);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills.length]);

  const mobileChunks = useMemo(() => {
    const third = Math.ceil(skills.length / 3);
    return [
      skills.slice(0, third),
      skills.slice(third, third * 2),
      skills.slice(third * 2),
    ];
  }, [skills]);

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
    };
    loadSkills();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="w-full min-h-screen py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <motion.h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center mb-16"
          style={{ fontFamily: 'grand' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: false, margin: '-80px' }}
        >
          My Specialities
        </motion.h2>
      </div>

      <div className="flex flex-col gap-5 mt-32 overflow-hidden">
        <ParallaxRow skills={isMobile ? mobileChunks[0] : skills} x={xRow1} />
        <ParallaxRow skills={isMobile ? mobileChunks[1] : skills} x={xRow2} reversed />
        <ParallaxRow skills={isMobile ? mobileChunks[2] : shuffledSkills} x={xRow3} />
      </div>
    </section>
  );
};

export default Skills;