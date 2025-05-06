import React, { useState } from 'react';

const Navbar = () => {

    const [showBot, setShowBot] = useState("false");

    return (
        <div>
            <div className='w-full h-15 md:h-20 bg-gray-950 flex justify-between items-center'>
                <p className='ml-3 md:ml-4 text-gray-400 text-xl md:text-3xl font-bold font-serif'> 
                    <a href="https://github.com/PriYanahsu/ONLINE-complaint-mangement-System">
                    Online Complaint System
                    </a>
                </p>
                <div className='flex justify-between items-center md:mr-4 mr-3 text-gray-500' >
                    <p className='ml-2 md:ml-3 font-bold md:text-xl  font-serif hover:text-red-600 hover:cursor-pointer'
                        onClick={() => setShowBot(!showBot)}>
                        About Us
                    </p>
                    {/* <p className='ml-2 md:ml-3 font-bold md:text-xl font-serif hover:text-green-600 hover:cursor-pointer'>Shared</p>
                    <p className='ml-2 md:ml-3 font-bold md:text-xl font-serif hover:text-green-600 hover:cursor-pointer'>App</p> */}
                </div>


                {/* Bot Popup Box */}
                {showBot && (
                    <div className="absolute top-1 md:top-16 right-1 md:right-10 bg-gray-800 text-white p-3 rounded-lg shadow-lg w-64">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold" >About Me</p>
                            <button onClick={() => setShowBot(false)} className="text-red-500 text-lg font-bold">
                                ✖
                            </button>
                        </div>
                        <p className="mt-2 text-sm">
                            Hi, I'm Priyanshu, a passionate software developer who loves building real-time projects using modern technologies.
                            I have experience working with (React.js, Tailwind CSS, Spring Boot, and MySQL).
                            My focus is on creating scalable web applications that solve real-world problems.
                        </p>
                        <p className="mt-2 text-sm">
                            Check out my projects on GitHub:
                            <a
                                href="https://github.com/PriYanahsu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-red-500"
                            >
                                PriYanahsu
                            </a>
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar
