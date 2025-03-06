import React, { useState } from 'react'

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
    <section id="contact" className='w-full h-screen flex justify-center mb-20'>
      <div className='w-[85%] h-full space-y-10'>
        <div className='text-6xl text-white' style={{fontFamily: 'grand'}}>Get In Touch</div>
        
        <div className='text-white text-xl mb-8' style={{fontFamily: 'reg'}}>
          Have a project in mind or just want to say hello? Feel free to send me a message!
        </div>
        
        <form onSubmit={handleSubmit} className='w-full max-w-2xl space-y-6'>
          <div>
            <label htmlFor="name" className='text-white text-lg block mb-2' style={{fontFamily: 'reg'}}>Name</label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className='w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-600 focus:border-[#e1ff00] focus:outline-none'
            />
          </div>
          
          <div>
            <label htmlFor="email" className='text-white text-lg block mb-2' style={{fontFamily: 'reg'}}>Email</label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className='w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-600 focus:border-[#e1ff00] focus:outline-none'
            />
          </div>
          
          <div>
            <label htmlFor="message" className='text-white text-lg block mb-2' style={{fontFamily: 'reg'}}>Message</label>
            <textarea 
              id="message" 
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className='w-full bg-[#2a2a2a] text-white p-3 rounded-lg border border-gray-600 focus:border-[#e1ff00] focus:outline-none'
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            className='bg-[#e1ff00] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#c9e600] transition-colors duration-300'
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
          
          {status === 'success' && (
            <div className='text-green-400 mt-4'>Message sent successfully!</div>
          )}
          
          {status === 'error' && (
            <div className='text-red-400 mt-4'>Failed to send message. Please try again.</div>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact