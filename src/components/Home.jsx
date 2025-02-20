import React from 'react'

const Home = () => {
  return (
    <div className='w-11/12 h-screen bg-[rgb(30, 30, 30)] justify-items-center justify-self-center'>
        <div className='flex justify-start space-x-20 items-center w-4/5 h-screen'>
            <div className='bg-white w-120 h-120 mt-15'>

            </div>
            <div className='h-5/12 w-6/12 overflow-x-visible mb-10'>
                <div className='text-6xl text-white mb-12 font-pp' style={{fontFamily: 'pp'}}>Hi There! My name is Adit</div>
                <div className='text-2xl text-white mb-3' style={{fontFamily: 'reg'}}>I'm a passionate Software Engineer with a strong interest in web development, software development, design, data science, and machine learning. I enjoy building innovative solutions, optimizing user experiences, and leveraging data-driven insights to create impactful applications.</div>
                <a className='flex text-purple-700 text-2xl hover:text-3xl transition-all duration-700' style={{fontFamily: 'reg'}} href="../../public/cvadit.pdf" target='blank'>See my resume →</a>
            </div>
        </div>
    </div>
  )
}

export default Home