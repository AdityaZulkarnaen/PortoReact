import { useState, useEffect } from 'react';
import { DataService } from '../../admin/services/dataService';

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

const ExperienceItem = ({ exp }) => (
  <div className="mb-12">
    <h3 className="text-2xl md:text-3xl text-white" style={{fontFamily: 'pp'}}>{exp.position}</h3>
    <div className="text-xl md:text-2xl text-white" style={{fontFamily: 'reg'}}>{exp.company}</div>
    <div className="text-lg md:text-xl text-gray-400" style={{fontFamily: 'reg'}}>{formatPeriod(exp)}</div>
    <div className="text-base md:text-xl text-white mt-3 md:mt-5" style={{fontFamily: 'reg'}}>{exp.description}</div>
    <div className="w-full h-[1px] bg-gray-400 mt-3 md:mt-4"></div>
  </div>
);

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <section id="experience" className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl text-white mb-12 md:mb-16" style={{fontFamily: 'grand'}}>
          Past Experiences
        </h2>
        
        {loading ? (
          <div className="animate-pulse space-y-8">
            {[1,2,3].map(i => (
              <div key={i}>
                <div className="h-8 bg-gray-700 rounded w-1/3 mb-2"></div>
                <div className="h-6 bg-gray-700 rounded w-1/4 mb-2"></div>
                <div className="h-5 bg-gray-800 rounded w-1/5 mb-4"></div>
                <div className="h-20 bg-gray-800 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {experiences.map((exp) => (
              <ExperienceItem key={exp.id} exp={exp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;