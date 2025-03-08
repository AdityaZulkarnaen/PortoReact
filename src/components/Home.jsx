import React, { useState, useEffect, useRef } from 'react';
import pp1 from '../assets/images/pp1.jpg';
import pp2 from '../assets/images/pp2.jpg';
import pp3 from '../assets/images/pp3.jpg';
import pp4 from '../assets/images/pp4.jpg';

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [pp1, pp2, pp3, pp4];
  const timerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    startTimer();
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    startTimer();
  };

  return (
    <section id="home" className={`w-full min-h-screen mt-15 px-4 md:px-8 lg:px-12 pt-20 md:pt-24 pb-12 bg-[rgb(30, 30, 30)] transition-all duration-700 ${!isLoaded ? 'blur-xl' : 'blur-none'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-8 lg:space-x-16">
          {/* Image carousel - takes full width on mobile, then appropriate size on larger screens */}
          <div className="w-full md:w-1/2 lg:w-2/5 h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] mb-8 md:mb-0 bg-white overflow-hidden relative rounded-lg">
            {images.map((src, index) => (
              <img 
                key={index}
                src={src} 
                alt={`Photo ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImage ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))}
            
            {/* Navigation buttons */}
            <button 
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-3xl md:text-4xl font-bold bg-opacity-50 text-[#e1ff00] p-2 w-6 h-6 md:w-7 md:h-7 rounded-full z-10"
            >
              &lt;
            </button>
            <button 
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-3xl md:text-4xl font-bold text-[#e1ff00] p-2 w-6 h-6 md:w-7 md:h-7 rounded-full z-10"
            >
              &gt;
            </button>
            
            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImage(index);
                    startTimer();
                  }}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                    index === currentImage ? 'bg-white' : 'bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Text content */}
          <div className="w-full md:w-1/2 lg:w-3/5">
            <h1 className="text-4xl sm:text-5xl md:text-6xl text-white mb-6 md:mb-8" style={{fontFamily: 'pp'}}>
              Hi there!👋 My name is Adit.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white mb-6" style={{fontFamily: 'reg'}}>
              I'm a passionate Software Engineer with a strong interest in web development, software development, design, data science, and machine learning. I enjoy building innovative solutions, optimizing user experiences, and leveraging data-driven insights to create impactful applications.
            </p>
            <a 
              className="relative inline-block text-[#e1ff00] text-lg md:text-xl after:block after:h-[2px] after:w-0 after:bg-[#e1ff00] after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:after:w-full" 
              style={{fontFamily: 'reg'}} 
              href="/cvadit.pdf" 
              target='blank'
            >
              See my resume →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;