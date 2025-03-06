import React from 'react';

const ExperienceItem = ({ title, company, period, description }) => (
  <div className="mb-12">
    <h3 className="text-2xl md:text-3xl text-white" style={{fontFamily: 'pp'}}>{title}</h3>
    <div className="text-xl md:text-2xl text-white" style={{fontFamily: 'reg'}}>{company}</div>
    <div className="text-lg md:text-xl text-gray-400" style={{fontFamily: 'reg'}}>{period}</div>
    <div className="text-base md:text-xl text-white mt-3 md:mt-5" style={{fontFamily: 'reg'}}>{description}</div>
    <div className="w-full h-[1px] bg-gray-400 mt-3 md:mt-4"></div>
  </div>
);

const Experience = () => {
  const experiences = [
    {
      title: "Software Programmer",
      company: "GAMAFORCE",
      period: "December 2024 - Present",
      description: "Gadjah Mada Flying Object Research Center is Universitas Gadjah Mada flying robot team engaged in research and development of Unmanned Aerial Vehicles (UAVs). As a Software Programmer, I take charge in the Ground Control Station website development and research. I help visualize the UAV data when in air so the operational team can fly the aircraft better."
    },
    {
      title: "Front-end Developer",
      company: "KATY SMAN 1 Yogyakarta",
      period: "February 2025 - Present",
      description: "As a Front-End Mobile Apk Developer for SATE (Satu Teladan Apk), I designed and developed an intuitive, fast, and responsive user interface to seamlessly connect alumni of SMA Negeri 1 Yogyakarta. This platform enables users to easily find alumni based on location and profession, stay updated with exclusive KATY event notifications, and engage in communities with shared interests and backgrounds."
    },
    {
      title: "Software Research Development Member",
      company: "KOMATIK UGM",
      period: "November 2024 - Present",
      description: "KOMATIK is a community that serves as a platform for UGM students to develop their skills in the ICT field, as well as to support and facilitate students in pursuing their interest in participating in IT competitions. My role as Software Research Development encourage me to develop a software projects to compete in IT contest such as GELATIK."
    }
  ];

  return (
    <section id="experience" className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl text-white mb-12 md:mb-16" style={{fontFamily: 'grand'}}>
          Past Experiences
        </h2>
        
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <ExperienceItem 
              key={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;