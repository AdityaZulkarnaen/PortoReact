import React, { useState } from 'react'
import sate from '../assets/images/sate.png'
import scholar from '../assets/images/scholar.png'
import Job from '../assets/images/Job.png'
import soon from '../assets/images/soon.png'

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-[#1e1e1e] rounded-xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-4xl text-white" style={{fontFamily: 'grand'}}>{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* <div className="flex justify-center mb-6">
          <img src={project.image} alt={project.title} className="rounded-lg max-h-64 object-contain" />
        </div> */}
        
        <div className="text-white mb-4" style={{fontFamily: 'reg'}}>
          <h3 className="text-2xl mb-2" style={{fontFamily: 'pp'}}>Description</h3>
          <p className="text-lg">{project.description}</p>
        </div>
        
        {project.technologies && (
          <div className="mb-4">
            <h3 className="text-2xl text-white mb-2" style={{fontFamily: 'pp'}}>Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
        
        {/* {project.link && (
          <div className="mt-6">
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-[#e1ff00] text-black px-4 py-2 rounded-lg font-bold hover:bg-[#c9e600] transition-colors"
            >
              View Project
            </a>
          </div>
        )} */}
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
    <div id="projects" className='mt-60 w-full h-[1600px]'>
      <div className='w-full h-[800px]'>
        <div className='text-white text-6xl flex justify-self-center' style={{fontFamily : 'grand'}}>Recent Works</div>
        <div className='flex flex-wrap justify-center gap-20 w-[90%] justify-self-center h-full mt-15'>
            <div 
              className='w-[35%] h-[70%] rounded-3xl flex justify-center items-center bg-[#FF6507] cursor-pointer hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300'
              onClick={() => setSelectedProject(projects[0])}
            >
              <img className='w-[40%] h-[70%] rounded-2xl' src={sate} alt="SATE Project" />
            </div>
            
            <div 
              className='w-[55%] h-[70%] rounded-3xl bg-[#001F54] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300'
              onClick={() => setSelectedProject(projects[1])}
            >
              <img className='w-[80%] h-[70%] rounded-2xl' src={scholar} alt="Scholar Project" />
            </div>
            
            <div 
              className='w-[60%] h-[70%] rounded-3xl bg-yellow-500 flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-yellow-300/30 transition-all duration-300'
              onClick={() => setSelectedProject(projects[2])}
            >
              <img className='w-[85%] h-[70%] rounded-2xl' src={Job} alt="Job Finder Project" />
            </div>
            
            <div className='w-[30%] h-[70%] rounded-3xl bg-red-500 flex items-center justify-center relative flex-col overflow-hidden group'>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center">
                <h3 className="text-4xl text-white font-bold mb-4" style={{fontFamily: 'grand'}}>Coming Soon!</h3>
                <p className="text-xl text-white text-center px-6" style={{fontFamily: 'reg'}}>
                  My next exciting project is currently in development
                </p>
              </div>
              <img className='mt-5 opacity-40' src={soon} alt="Coming Soon" />
              <img src={soon} alt="Coming Soon" className="opacity-40" />
            </div>
      </div>
      </div>
      
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  )
}

export default Projects