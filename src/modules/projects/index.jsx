import { useState, useEffect } from 'react';
import { DataService } from '../../admin/services/dataService';
import sate from '../../assets/images/sate.png';
import scholar from '../../assets/images/scholar.png';
import Job from '../../assets/images/Job.png';
import soon from '../../assets/images/soon.png';

const ProjectCarousel = ({ projects, onProjectClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [projects.length]);

  const getVisibleProjects = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % projects.length;
      result.push({ ...projects[index], slideIndex: i });
    }
    return result;
  };

  return (
    <div className="relative w-full mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl md:text-4xl text-white" style={{fontFamily: 'grand'}}>
          All Projects
        </h3>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-6 transition-transform duration-500 ease-in-out">
          {getVisibleProjects().map((project, index) => (
            <div
              key={`${project.id}-${currentIndex}`}
              className={`flex-shrink-0 w-full md:w-1/3 bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 ${
                index === 1 ? 'md:scale-105' : 'md:scale-95'
              }`}
              onClick={() => onProjectClick(project)}
            >
              <div className="h-48 bg-gray-700 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg md:text-xl text-white mb-2" style={{fontFamily: 'pp'}}>
                  {project.title}
                </h4>
                <p className="text-gray-300 text-sm mb-3 line-clamp-2" style={{fontFamily: 'reg'}}>
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="text-xs bg-gray-600 text-gray-200 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies?.length > 3 && (
                    <span className="text-xs text-gray-400">+{project.technologies.length - 3} more</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const FeaturedProject = ({ project, onProjectClick }) => {
  if (!project) return null;

  return (
    <div className="mb-16">
      <h3 className="text-3xl md:text-4xl text-white mb-8" style={{fontFamily: 'grand'}}>
        Featured Work
      </h3>
      
      <div className="flex flex-wrap justify-center gap-[5%] max-w-7xl justify-self-center space-y-[5%] h-full">
        {/* First project - 3:4 aspect ratio on mobile */}
        <div 
          className="w-full aspect-[3/4] md:aspect-auto md:h-64 lg:h-132 lg:w-[30%] rounded-2xl flex justify-center items-center bg-[#FF6507] cursor-pointer hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300"
          onClick={() => onProjectClick(project)}
        >
          <img className="w-fit h-[63%] rounded-xl object-contain" src={project.image} />
        </div>
        
        <div 
          className="w-full aspect-video md:aspect-auto md:h-64 lg:h-132 lg:w-[65%] rounded-2xl bg-[#001F54] flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
          onClick={() => onProjectClick(project)}
        >
          <img className="w-fit h-[63%] rounded-xl object-contain" src={scholar} alt="Scholar Project" />
        </div>
        
        {/* Second row: larger project and coming soon box */}
        <div 
          className="w-full col-span-1 md:col-span-2 aspect-video md:h-64 lg:h-[70%] lg:w-[65%] rounded-2xl bg-yellow-500 flex justify-center items-center cursor-pointer hover:shadow-lg hover:shadow-yellow-300/30 transition-all duration-300 mt-4 md:mt-6"
          onClick={() => onProjectClick(project)}
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
  );
};

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-[#1e1e1e] rounded-xl p-4 sm:p-6 md:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-white" style={{fontFamily: 'grand'}}>{project.title}</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white text-3xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-700 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Project Image */}
        <div className="mb-6">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover rounded-xl"
          />
        </div>
        
        <div className="text-white mb-6" style={{fontFamily: 'reg'}}>
          <h3 className="text-xl md:text-2xl mb-3" style={{fontFamily: 'pp'}}>About This Project</h3>
          <p className="text-base md:text-lg leading-relaxed">{project.description}</p>
        </div>
        
        {project.technologies && (
          <div className="mb-6">
            <h3 className="text-xl md:text-2xl text-white mb-3" style={{fontFamily: 'pp'}}>Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {(project.github_url || project.live_url) && (
          <div className="flex gap-4">
            {project.github_url && (
              <button
                onClick={() => window.open(project.github_url, '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                View Source Code
              </button>
            )}
            {project.live_url && (
              <button
                onClick={() => window.open(project.live_url, '_blank')}
                className="border-2 border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Live Demo
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fallback projects data
  const fallbackProjects = [
    {
      id: 1,
      title: "SATE Mobile App",
      image: sate,
      description: "A mobile application designed for SMA Negeri 1 Yogyakarta alumni to connect with each other. Users can find alumni based on location and profession, receive notifications about exclusive KATY events, and join communities with shared interests.",
      technologies: ["React Native", "Expo", "Firebase", "JavaScript"],
      github_url: "https://github.com/your-repo-link",
      background_color: "#FF6507",
      featured: true,
      status: "completed"
    },
    {
      id: 2,
      title: "Scholar Hub",
      image: scholar,
      description: "An educational platform that connects students with resources and opportunities. This project aims to democratize access to scholarships and academic materials for underserved communities.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
      github_url: "https://github.com/your-repo-link",
      background_color: "#001F54",
      status: "completed"
    },
    {
      id: 3,
      title: "Job Finder",
      image: Job,
      description: "A comprehensive job search platform that helps users find relevant opportunities based on their skills and preferences. Features include resume builder, application tracking, and personalized job recommendations.",
      technologies: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Express"],
      github_url: "https://github.com/your-repo-link",
      background_color: "#F59E0B",
      status: "completed"
    },
    {
      id: 4,
      title: "Coming Soon",
      image: soon,
      description: "My next exciting project is currently in development. Stay tuned for something amazing!",
      technologies: ["React", "Next.js", "TypeScript"],
      background_color: "#EF4444",
      status: "coming_soon"
    }
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const result = await DataService.getProjects();
      if (result.success && result.data && result.data.length > 0) {
        // Map Supabase data to include fallback images if no image_url
        const mappedProjects = result.data.map(project => ({
          ...project,
          image: project.image_url || getDefaultImage(project.title),
          link: project.github_url
        }));
        setProjects(mappedProjects);
      } else {
        // Use fallback data if no projects in database
        setProjects(fallbackProjects);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Use fallback data on error
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = (title) => {
    if (title.toLowerCase().includes('sate')) return sate;
    if (title.toLowerCase().includes('scholar')) return scholar;
    if (title.toLowerCase().includes('job')) return Job;
    return soon;
  };

  const featuredProject = projects.find(p => p.featured) || projects[0];
  const allProjects = projects;

  if (loading) {
    return (
      <section id="projects" className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white text-xl" style={{fontFamily: 'reg'}}>Loading projects...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl text-white mb-12 md:mb-16" style={{fontFamily: 'grand'}}>
          Recent Works
        </h2>
        
        {/* Featured Project */}
        <FeaturedProject 
          project={featuredProject} 
          onProjectClick={setSelectedProject}
        />
        
        {/* Projects Carousel */}
        <ProjectCarousel 
          projects={allProjects}
          onProjectClick={setSelectedProject}
        />
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