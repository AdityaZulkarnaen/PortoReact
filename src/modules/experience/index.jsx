import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DataService } from '../../admin/services/dataService';
import Noise from '../../components/Noise';

/** Responsive stacking constants */
const useStackConfig = () => {
  const [config, setConfig] = useState(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    return isMobile
      ? { baseTop: 40, gap: 15 }
      : { baseTop: 80, gap: 40 };
  });

  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 768;
      setConfig(isMobile
        ? { baseTop: 40, gap: 15 }
        : { baseTop: 80, gap: 40 }
      );
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return config;
};

const fallbackExperiences = [
  {
    id: 1,
    title: "Software Programmer",
    company: "GAMAFORCE",
    location: "Yogyakarta, Indonesia",
    start_date: "2024-12",
    is_current: true,
    description: "Gadjah Mada Flying Object Research Center is Universitas Gadjah Mada flying robot team engaged in research and development of Unmanned Aerial Vehicles (UAVs). As a Software Programmer, I take charge in the Ground Control Station website development and research. I help visualize the UAV data when in air so the operational team can fly the aircraft better."
  },
  {
    id: 2,
    title: "Front-end Developer",
    company: "KATY SMAN 1 Yogyakarta",
    location: "Yogyakarta, Indonesia",
    start_date: "2025-02",
    is_current: true,
    description: "As a Front-End Mobile Apk Developer for SATE (Satu Teladan Apk), I designed and developed an intuitive, fast, and responsive user interface to seamlessly connect alumni of SMA Negeri 1 Yogyakarta. This platform enables users to easily find alumni based on location and profession, stay updated with exclusive KATY event notifications, and engage in communities with shared interests and backgrounds."
  },
  {
    id: 3,
    title: "Software Research Development Member",
    company: "KOMATIK UGM",
    location: "Yogyakarta, Indonesia",
    start_date: "2024-11",
    is_current: true,
    description: "KOMATIK is a community that serves as a platform for UGM students to develop their skills in the ICT field, as well as to support and facilitate students in pursuing their interest in participating in IT competitions. My role as Software Research Development encourage me to develop a software projects to compete in IT contest such as GELATIK."
  }
];

const formatPeriod = (exp) => {
  const start = exp.start_date
    ? new Date(exp.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '';
  const end = exp.is_current
    ? 'Present'
    : exp.end_date
      ? new Date(exp.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' })
      : '';
  return start && end ? `${start} - ${end}` : start || end;
};

/**
 * Stacking card 
 *
 * Each card's outer wrapper is 100vh tall & sticky at top:0.
 * The inner card scales down (transform-origin: top) as the
 * *section* scroll progresses, so earlier cards shrink behind
 * the later ones, producing the classic stacking-cards parallax.
 *
 * `progress`   – the parent section's scrollYProgress (0 → 1)
 * `range`      – [start, 1] slice where this card begins shrinking
 * `targetScale`– smallest scale this card reaches (e.g. 0.9)
 * `index`      – card order (controls `top` offset for peeking)
 */
const ExperienceCard = ({ exp, index, progress, range, targetScale, baseTop, gap }) => {
  const cardRef = useRef(null);

  // Card scales down as the SECTION scrolls past it (next card covers it)
  const scale = useTransform(progress, range, [1, targetScale]);

  // Each card gets a slightly larger top offset so you can see the edge of
  // previous cards peeking behind – the classic stacking look.
  const topOffset = baseTop + index * gap;

  return (
    <>
    {/* <Noise></Noise> */}
    <div
      ref={cardRef}
      className="sticky justify-self-center mt-12"
      style={{
        height: `calc(100vh - ${index * gap}px)`,
        top: `${topOffset}px`,
        zIndex: index + 1,
        backgroundColor: 'transparent',
      }}
    >
      <motion.div
        className="relative w-full max-w-5xl rounded-3xl border border-white/10 px-5 py-6 md:px-12 md:py-14 flex flex-col gap-3 md:gap-6 origin-top"
        style={{
          scale,
          backgroundColor: 'rgb(20, 20, 20)',
          boxShadow: '0 4px 40px rgba(0,0,0,.45)',
        }}
      >
        {/* Top row: number badge + period */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs md:text-base tracking-widest text-[#e1ff00] uppercase"
            style={{ fontFamily: 'reg' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className="text-xs md:text-base text-gray-400"
            style={{ fontFamily: 'reg' }}
          >
            {formatPeriod(exp)}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-xl md:text-5xl text-white leading-tight"
          style={{ fontFamily: 'pp' }}
        >
          {exp.position}
        </h3>

        {/* Company + location */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span
            className="text-base md:text-2xl text-white"
            style={{ fontFamily: 'reg' }}
          >
            {exp.company}
          </span>
          {exp.location && (
            <span
              className="text-sm md:text-lg text-gray-500"
              style={{ fontFamily: 'reg' }}
            >
              — {exp.location}
            </span>
          )}
        </div>

        {/* Separator */}
        <div className="w-full h-[1px] bg-white/10" />

        {/* Description */}
        <p
          className="text-sm md:text-xl text-gray-300 leading-relaxed"
          style={{ fontFamily: 'reg' }}
        >
          {exp.description}
        </p>
      </motion.div>
    </div>
    </>
  );
};

/** Invisible spacer card – keeps stacking scroll space without visible content */
const SpacerCard = ({ index, progress, range, targetScale, baseTop, gap }) => {
  const scale = useTransform(progress, range, [1, targetScale]);
  const topOffset = baseTop + index * gap;

  return (
    <div
      className="sticky justify-self-center"
      style={{
        height: `calc(100vh - ${index * gap}px)`,
        top: `${topOffset}px`,
        zIndex: index + 1,
        backgroundColor: 'transparent',
        pointerEvents: 'none',
      }}
    >
      <motion.div
        className="relative w-full max-w-5xl rounded-3xl px-8 py-10 md:px-12 md:py-14 flex flex-col gap-6 origin-top"
        style={{
          scale,
          backgroundColor: 'transparent',
        }}
      />
    </div>
  );
};

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const { baseTop, gap } = useStackConfig();

  // Track the entire section's scroll progress (drives card scaling)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    const load = async () => {
      try {
        const result = await DataService.getExperience();
        if (result.success && result.data && result.data.length > 0) {
          setExperiences(result.data);
        } else {
          setExperiences(fallbackExperiences);
        }
      } catch {
        setExperiences(fallbackExperiences);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full relative px-4 md:px-8 lg:px-12"
    >
      {/* Section heading */}
      <div className="max-w-7xl mx-auto pt-16 md:pt-24 pb-8">
        <motion.h2
          className="text-5xl md:text-6xl text-white"
          style={{ fontFamily: 'grand' }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          Past Experiences
        </motion.h2>
      </div>

      {/* Stacking cards */}
      {loading ? (
        <div className="max-w-5xl mx-auto animate-pulse space-y-8 pb-24">
          {[1, 2, 3].map(i => (
            <div key={i} className="rounded-3xl border border-white/10 p-10">
              <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
              <div className="h-6 bg-gray-700 rounded w-1/4 mb-4"></div>
              <div className="h-5 bg-gray-800 rounded w-1/5 mb-6"></div>
              <div className="h-[1px] bg-white/10 mb-6"></div>
              <div className="h-20 bg-gray-800 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {experiences.map((exp, i) => {
            const total = experiences.length + 1; // +1 for the invisible spacer card
            // Each card starts scaling at its proportional scroll position
            const rangeStart = i * (1 / total);
            // Scale target: first card shrinks more, last card barely shrinks
            const targetScale = 1 - (total - i) * 0.05;

            return (
              <ExperienceCard
                key={exp.id}
                exp={exp}
                index={i}
                progress={scrollYProgress}
                range={[rangeStart, 1]}
                targetScale={targetScale}
                baseTop={baseTop}
                gap={gap}
              />
            );
          })}

          {/* Invisible spacer card – pushes the last real card into its stacked position */}
          <SpacerCard
            index={experiences.length}
            progress={scrollYProgress}
            range={[experiences.length * (1 / (experiences.length + 1)), 1]}
            targetScale={1 - 0.05}
            baseTop={baseTop}
            gap={gap}
          />
        </div>
      )}
    </section>
  );
};

export default Experience;