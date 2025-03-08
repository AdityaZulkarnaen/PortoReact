import React, { useState } from 'react';
import sate from '../assets/images/sate.png';
import scholar from '../assets/images/scholar.png';
import Job from '../assets/images/Job.png';
import soon from '../assets/images/soon.png';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white" style={{fontFamily: 'grand'}}>{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="text-white mb-4" style={{fontFamily: 'reg'}}>
          <h3 className="text-xl md:text-2xl mb-2" style={{fontFamily: 'pp'}}>Description</h3>
          <p className="text-base md:text-lg">{project.description}</p>
        </div>
        
        {project.technologies && (
          <div className="mb-4">
            <h3 className="text-xl md:text-2xl text-white mb-2" style={{fontFamily: 'pp'}}>Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const projects = [
    {
      id: 1,
      title: "SATE Mobile App",
      image: sate,
      description: "A mobile application designed for SMA Negeri 1 Yogyakarta alumni to connect with each other. Users can find alumni based on location and profession, receive notifications about exclusive KATY events, and join communities with shared interests.",
      technologies: ["React Native", "Expo", "Firebase", "JavaScript"],
      link: "https://github.com/your-repo-link"
    },
    {
      id: 2,
      title: "Scholar Hub",
      image: scholar,
      description: "An educational platform that connects students with resources and opportunities. This project aims to democratize access to scholarships and academic materials for underserved communities.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      link: "https://github.com/your-repo-link"
    },
    {
      id: 3,
      title: "Job Finder",
      image: Job,
      description: "A comprehensive job search platform that helps users find relevant opportunities based on their skills and preferences. Features include resume builder, application tracking, and personalized job recommendations.",
      technologies: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Express"],
      link: "https://github.com/your-repo-link"
    }
  ];

  return (
    <section id="projects" className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl text-white mb-12 md:mb-16" style={{fontFamily: 'grand'}}>
          Recent Works
        </h2>
        
        <div className="flex flex-wrap justify-center gap-[5%] max-w-7xl justify-self-center space-y-[5%] h-full mt-15'">
          {/* First project - 3:4 aspect ratio on mobile */}
          <div 
            className="w-full aspect-[3/4] md:aspect-auto md:h-64 lg:h-132 lg:w-[30%] rounded-2xl flex justify-center items-center bg-[#FF6507] cursor-pointer hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
            onClick={() => setSelectedProject(projects[0])}
          >
            <img className="w-fit h-[63%] rounded-xl object-contain" src={sate} />
          </div>
          
          <div 
            className="w-full aspect-video md:aspect-auto md:h-64 lg:h-132 lg:w-[65%] rounded-2xl bg-[#001F54] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            onClick={() => setSelectedProject(projects[1])}
          >
            <img className="w-fit h-[63%] rounded-xl object-contain" src={scholar} alt="Scholar Project" />
          </div>
          
          {/* Second row: larger project and coming soon box */}
          <div 
            className="w-full col-span-1 md:col-span-2 aspect-video md:h-64 lg:h-[70%] lg:w-[65%] rounded-2xl bg-yellow-500 flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-yellow-300/30 transition-all duration-300 mt-4 md:mt-6"
            onClick={() => setSelectedProject(projects[2])}
          >
            <img className="w-fit h-[61%] rounded-xl object-contain" src={Job} alt="Job Finder Project" />
          </div>
          
          {/* Coming soon project - 3:4 aspect ratio on mobile */}
          <div className="w-full col-span-1 md:col-span-2 aspect-[3/4] md:aspect-auto md:h-64 lg:h-118 lg:w-[30%] rounded-2xl bg-red-500 flex items-center justify-center relative flex-col overflow-hidden group mt-4 md:mt-6">
            <div className="absolute inset-0 bg-black h-full bg-opacity-50 flex flex-col items-center justify-center p-4">
              <h3 className="text-2xl md:text-4xl text-white font-bold mb-4" style={{fontFamily: 'grand'}}>Coming Soon!</h3>
              <p className="text-base md:text-xl text-white text-center px-6" style={{fontFamily: 'reg'}}>
                My next exciting project is currently in development
              </p>
            </div>
            <img className="opacity-40 object-cover lg:w-full md:w-fit" src={soon} alt="Coming Soon" />
          </div>
        </div>
      </div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;