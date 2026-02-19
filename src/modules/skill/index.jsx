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

const allSkills = [
  { icon: html,    name: 'HTML' },
  { icon: css,     name: 'CSS' },
  { icon: js,      name: 'JavaScript' },
  { icon: python,  name: 'Python' },
  { icon: react,   name: 'React JS' },
  { icon: tailwind,name: 'Tailwind' },
  { icon: express, name: 'Express' },
  { icon: sql,     name: 'SQL' },
  { icon: figma,   name: 'Figma' },
  { icon: expo,    name: 'Expo' },
  { icon: github,  name: 'Github' },
  { icon: next,    name: 'Next JS' },
];



const SkillItem = ({ icon, name }) => (
  <div className="flex items-center gap-3 px-5 py-3 rounded-xl text-white shrink-0 transition-all duration-300">
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
  return (
    <section id="skills" className="w-full min-h-screen py-16 md:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white text-center mb-16" style={{ fontFamily: 'grand' }}>
          My Specialities
        </h2>
      </div>

      <div className="flex flex-col gap-5 mt-32">
        <MarqueeRow skills={allSkills} direction="left"  speed={75} />
        <MarqueeRow skills={allSkills} direction="right" speed={85} />
        <MarqueeRow skills={allSkills} direction="left"  speed={80} />
      </div>
    </section>
  );
};

export default Skills;