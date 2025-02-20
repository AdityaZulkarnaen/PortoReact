import React from 'react'
import github from '../assets/github-logo.png';
import react from '../assets/react.svg'
import tailwind from '../assets/tailwind.svg'
import express from '../assets/express.svg'
import js from '../assets/JavaScript.svg'
import sql from '../assets/sql.svg'
import html from '../assets/html-1.svg'
import css from '../assets/css.svg'
import figma from '../assets/figma.svg'
import python from '../assets/python.svg'

const Skills = () => {
  return (
    <section className='h-screen w-11/12 justify-self-center'>
        <div className='h-4/5' >
            <div className='text-9xl text-white justify-self-center mt-50 mb-20' style={{fontFamily: 'bogart'}}>
                My Speciality
            </div>
            <div className='w-[98%] h-[98%] justify-self-center mt-15' style={{fontFamily: 'reg'}}>
                <div className="w-[90%] h-[90%] flex gap-[8%] flex-wrap content-stretch items-stretch justify-center justify-self-center justify-items-center flex-row">
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={html} alt="" /> HTML</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={css} alt="" /> CSS</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={js} alt="" /> JavaScript</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={python} alt="" /> Python</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={react} alt="" /> React</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={tailwind} alt="" /> Tailwind</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={express} alt="" /> Express</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={sql} alt="" /> SQL</div>
                    </div>
                    <div className="w-[23.5%] h-[23.5%] border-purple-950 shadow-purple-800 shadow-lg border-3 rounded-xl text-white">
                        <div className='flex items-center h-[100%] text-2xl'> <img className='w-15 h-15 ml-4 mr-4' src={figma} alt="" /> Figma</div>
                    </div>
                </div>
            </div>

        </div>
    </section>
  )
}

export default Skills