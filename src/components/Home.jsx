import React, { useState, useEffect, useRef } from 'react'
import pp1 from '../assets/images/pp1.jpg'
import pp2 from '../assets/images/pp2.jpg'
import pp3 from '../assets/images/pp3.jpg'
import pp4 from '../assets/images/pp4.jpg'

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [pp1, pp2, pp3, pp4];
  const timerRef = useRef(null);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Changed to 5 seconds
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
    startTimer(); // Reset timer when manually changing image
  };

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    startTimer(); // Reset timer when manually changing image
  };

  return (
    <div className='w-11/12 h-screen bg-[rgb(30, 30, 30)] justify-items-center justify-self-center'>
        <div className='flex justify-start space-x-20 items-center w-4/5 h-screen'>
            <div className='bg-white w-120 h-120 mt-15 overflow-hidden relative'>
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
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 flex items-center justify-cente text-4xl font-bold bg-opacity-50 text-[#e1ff00] p-2 1-7 h-7 rounded-full z-10"
                >
                  &lt;
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center justify-center text-4xl font-bold text-[#e1ff00] p-2 w-7 h-7 rounded-full z-10"
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
                      className={`w-3 h-3 rounded-full ${
                        index === currentImage ? 'bg-white' : 'bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
            </div>
            <div className='h-5/12 w-6/12 overflow-x-visible mb-10'>
                <div className='text-6xl text-white mb-12 font-pp' style={{fontFamily: 'pp'}}>Hi there!👋 My name is Adit.</div>
                <div className='text-2xl text-white mb-3' style={{fontFamily: 'reg'}}>I'm a passionate Software Engineer with a strong interest in web development, software development, design, data science, and machine learning. I enjoy building innovative solutions, optimizing user experiences, and leveraging data-driven insights to create impactful applications.</div>
                <a className="relative text-[#e1ff00] text-xl after:block after:h-[2px] after:w-0 after:bg-[#e1ff00] after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-500 hover:after:w-[86%]" style={{fontFamily: 'reg'}} href="../../public/cvadit.pdf" target='blank'>See my resume →</a>
            </div>
        </div>
    </div>
  )
}

export default Home