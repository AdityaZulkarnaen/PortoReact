import React from 'react'
import sate from '../assets/images/sate.png'
import scholar from '../assets/images/scholar.png'

const Projects = () => {
  return (
    <div className='mt-60 w-full h-[1600px]'>
      <div className='w-full h-[800px]'>
        <div className='text-white text-6xl flex justify-self-center' style={{fontFamily : 'grand'}}>Recent Works</div>
        <div className='flex flex-wrap justify-center gap-20 w-[90%] justify-self-center h-full mt-15'>
            <div className='w-[35%] h-[70%] rounded-3xl flex justify-center items-center bg-[#FF6507]'>
              <img className='w-[40%] h-[70%] rounded-2xl' src={sate} alt="" />
            </div>
            <div className='w-[55%] h-[70%] rounded-3xl bg-[#001F54] flex justify-center items-center'>
              <img className='w-[80%] h-[70%] rounded-2xl' src={scholar} alt="" />
            </div>
            <div className='w-[60%] h-[70%] rounded-3xl bg-white'></div>
            <div className='w-[30%] h-[70%] rounded-3xl bg-white'></div>
      </div>
      </div>
    </div>
  )
}

export default Projects