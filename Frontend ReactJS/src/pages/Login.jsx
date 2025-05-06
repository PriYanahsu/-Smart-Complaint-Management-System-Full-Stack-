import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const [role, setRole] = useState("user");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loadingText, setLoadingText] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsSubmitting(true);
        if (!username || !password) {
            setError("Username and Password are required!");
            setIsSubmitting(false);
            return;
        }

        setError("");

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
                role
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            console.log(response.data);
            if (response.status === 200) {
                if (response.data.role === "admin") {
                    setLoadingText("Redirecting to Admin Dashboard...");
                    setTimeout(() => {
                        navigate("/admin-home");
                        setIsSubmitting(false);
                    }, 2000);
                } else if (response.data.role === "user") {
                    setLoadingText("Redirecting to User Dashboard...");
                    setTimeout(() => {
                        navigate("/home");
                        setIsSubmitting(false);
                    }, 2000);
                } else {
                    setLoadingText("Incorrect credentials. Redirecting...");
                    setTimeout(() => {
                        navigate("/");
                        setIsSubmitting(false);
                    }, 2000);
                }
            }else{
                setError(`Unexpected Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Login Error:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    setError("Invalid Username or Password or Role");
                } else {
                    setError(`Server Error: ${error.response.status}`);
                }
            } else {
                setError("Network error. Check if backend is running.");
            }
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative">
            {isSubmitting && (
                <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="text-black text-2xl font-bold animate-pulse">{loadingText}</div>
                </div>
            )}
            <div className={`transition duration-300 ${isSubmitting ? 'blur-sm pointer-events-none' : ''}`}>
                <Navbar />
                <div className="w-full h-140 bg-[url('/img.png')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center pt-12">
                    <div className="mb-6">
                        <select
                            className="bg-fuchsia-950 p-2 text-amber-200 rounded-lg cursor-pointer"
                            onChange={(e) => setRole(e.target.value)}
                            value={role}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="w-85 md:w-96 p-8 border-2 rounded-2xl bg-gray-700 shadow-lg">
                        <p className="text-2xl text-gray-400 font-bold mb-5 text-center">
                            {role.toUpperCase()}
                        </p>
                        <form className="font-serif flex flex-col">
                            <label className="mb-1">
                                {role.charAt(0).toUpperCase() + role.slice(1)} name:
                            </label>
                            <input
                                type="text"
                                className="mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <label className="mb-1">Password:</label>
                            <input
                                type="password"
                                className="mb-4 bg-gray-500 p-2 rounded-lg focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {error && <p className="text-yellow-500 text-center mb-3">{error}</p>}

                            <p className="text-sm ml-3 md:ml-8">
                                If you are new here please{' '}
                                <span onClick={() => navigate("/register")} className="text-sky-400 cursor-pointer hover:text-green-400">Register first</span>
                            </p>

                            <input
                                type="button"
                                value="Login"
                                className="w-full bg-blue-600 px-4 py-2 mt-2 rounded-lg hover:bg-green-600 transition duration-300"
                                onClick={handleLogin}
                            />
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;
