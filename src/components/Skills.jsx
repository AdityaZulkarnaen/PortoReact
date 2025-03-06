import React from 'react'
import github from '../assets/icon/github-logo.png';
import react from '../assets/icon/react.svg'
import tailwind from '../assets/icon/tailwind.svg'
import express from '../assets/icon/express.svg'
import js from '../assets/icon/JavaScript.svg'
import sql from '../assets/icon/sql.svg'
import html from '../assets/icon/html-1.svg'
import css from '../assets/icon/css.svg'
import figma from '../assets/icon/figma.svg'
import python from '../assets/icon/python.svg'
import expo from '../assets/icon/expo.svg'
import next from '../assets/icon/next.svg'

const Skills = () => {
  return (
    <section className='h-screen w-[100%] justify-self-center mt-60'>
        <div className='h-full' >
            <div className='text-9xl text-white justify-self-center mb-20' style={{fontFamily: 'grand'}}>
                My Speciality
            </div>
            <div className='w-full h-full justify-self-center mt-5' style={{fontFamily: 'reg'}}>
                <div className="w-4/5 h-[70%] flex gap-[5%] flex-wrap justify-self-center justify-evenly">
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={html} alt="" /> HTML</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={css} alt="" /> CSS</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={js} alt="" /> JavaScript</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={python} alt="" /> Python</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={react} alt="" /> React JS</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={tailwind} alt="" /> Tailwind</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={express} alt="" /> Express</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={sql} alt="" /> SQL</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={figma} alt="" /> Figma</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white fill-white"  >
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={expo} alt="" /> Expo</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={github} alt="" /> Github</div>
                    </div>
                    <div className="w-[20%] h-[18.8%] border-purple-950 border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-xl' style={{fontFamily:'pp'}}> <img className='w-10 h-10 ml-4 mr-4' src={next} alt="" /> Next JS</div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Skills