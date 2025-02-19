import React from 'react'
import github from '../assets/github-logo.png'
import insta from '../assets/insta.png'
import linkedin from '../assets/linkedin.svg'

const Navbar = () => {
  return (
    <nav className='w-3/5 h-20 bg-black justify-self-center rounded-4xl mt-7 content-center'>
        <div className='inline-flex w-[100%] justify-between'>
            <div>
                <ul className='list-none inline-flex text-white space-x-5 ml-5'>
                    <li>
                        <a href="">
                            <img src={github} alt="" className='w-10 h-10' />
                        </a>
                    </li>
                    <li>
                    <a href="">
                            <img src={insta} alt="" className='w-10 h-10' />
                        </a>
                    </li>
                    <li>
                    <a href="">
                            <img src={linkedin} alt="" className='w-10 h-10' />
                        </a>
                    </li>
                </ul>
            </div>
            <div className='flex text-white items-center mr-8 space-x-8 text-xl'>
                <a href="">Home</a>
                <a href="">Skills</a>
                <a href="">Projects</a>
                <a href="">Contact Me</a>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar