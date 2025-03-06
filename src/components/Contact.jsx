import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://formspree.io/f/xanewewe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  return (
    <section id="contact" className="w-full min-h-screen px-4 md:px-8 lg:px-12 py-16 md:py-20 flex flex-col justify-center bg-[#1a1a1a]">
      <div className="max-w-3xl mx-auto w-full space-y-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold" style={{fontFamily: 'grand'}}>
          Get In Touch
        </h2>
        
        <div className="text-white text-lg md:text-xl mb-8" style={{fontFamily: 'reg'}}>
          Have a project in mind or just want to say hello? Feel free to send me a message!
        </div>
        
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="name" className="text-white text-base md:text-lg block mb-2" style={{fontFamily: 'reg'}}>Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-600 focus:border-[#e1ff00] focus:outline-none transition duration-300"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="text-white text-base md:text-lg block mb-2" style={{fontFamily: 'reg'}}>Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-600 focus:border-[#e1ff00] focus:outline-none transition duration-300"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="message" className="text-white text-base md:text-lg block mb-2" style={{fontFamily: 'reg'}}>Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-600 focus:border-[#e1ff00] focus:outline-none resize-y transition duration-300"
              placeholder="Write your message here..."
            ></textarea>
          </div>
          
          <div className="pt-2">
            <button 
              type="submit" 
              disabled={status === 'sending'}
              className="px-8 py-3 bg-[#e1ff00] text-black font-semibold rounded-lg hover:bg-opacity-90 transition duration-300 text-lg transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            
            {status === 'success' && (
              <div className="mt-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 text-green-500 rounded-lg">
                Your message has been sent successfully!
              </div>
            )}
            
            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 text-red-500 rounded-lg">
                There was an error sending your message. Please try again.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;