import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAsyncError, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Registration = () => {

    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [registered, setRegistered] = useState(false);
    const [register, setRegister] = useState({
        username: "",
        password: "",
        role: ""
    });

    // Optional useEffect if you want to pre-fill or change something initially
    useEffect(() => {
        setRegister(prev => ({
            ...prev,
            role: "user"
        }));
    }, []);

    const handleChange = (e) => {
        setRegister(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleRegister = async () => {
        if (!register.username || !register.password) {
            setError("Enter the both value ")
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/auth/register", register);
            if (response.status === 200) {
                if (response.data.includes("admin")) {
                    setRegistered(true);
                    navigate("/");
                } else if (response.data.includes("user")) {
                    setRegistered(true);
                    navigate("/");
                } else {
                    setError("Axios not working");
                }
            }
        } catch (error) {
            if (error === 400) {
                setError("Username Already Registered");
            }
            setError(`Some error occur ${error}`)
        }
    };

    return (
        <>
            <Navbar />
            <div className="w-full h-140 bg-[url('/img.png')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center pt-12">
                <div className='w-96 p-8 border-2 rounded-2xl bg-gray-700 shadow-lg'>
                {registered && (
                    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                        Registered Successfully
                    </div>
                )}
                    <p className='text-2xl font-bold font-serif text-gray-400 ml-10 mb-2 hover:text-white'>Registration Form</p>
                    <form className='font-serif flex flex-col'>

                        <label className="mb-1">Name:</label>
                        <input
                            type="text"
                            name="username"
                            className='mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none'
                            value={register.username}
                            onChange={handleChange}
                        />

                        <label className="mb-1">Password:</label>
                        <input
                            type="password"
                            name="password"
                            className='mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none'
                            value={register.password}
                            onChange={handleChange}
                        />

                        <label className="mb-1">Role:</label>
                        <select
                            name="role"
                            className="mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none"
                            value={register.role}
                            onChange={handleChange}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>

                        {error && <p className="text-yellow-500 text-center mb-3">{error}</p>}

                        <p className='ml-14'> Click here for <spam className='text-blue-500 font-serif cursor-pointer hover:text-green-500' onClick={() => navigate('/')}>Login page</spam></p>

                        <input
                            type="button"
                            value="Register"
                            onClick={handleRegister}
                            className='w-full bg-blue-600 px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition duration-300'
                        />
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Registration;
