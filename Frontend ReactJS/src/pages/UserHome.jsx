import axios from 'axios';
import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const UserHome = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        problemName: "",
        description: "",
        location: "",
        time: "",
        image: null
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const [facingMode, setFacingMode] = useState("user"); // front by default
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [textData, setTextDATA] = useState("");

    // Token validation at page load
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("No token found. Please login again.");
            navigate("/login");
        }
    }, [navigate]);

    const naviga = () => {
        setIsSubmitting(true);
        setTextDATA("Moving...");
        setTimeout(() => {
            setIsSubmitting(false);
            navigate("/complaints");
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const openCamera = async () => {
        setIsCameraOpen(true);
        const constraints = {
            video: { facingMode: facingMode }
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current?.srcObject;
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const captureImage = () => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext("2d");

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataURL = canvas.toDataURL("image/png");
        setCapturedImage(imageDataURL);
        setFormData({ ...formData, image: imageDataURL });

        stopCamera();
        setIsCameraOpen(false);
    };

    const toggleCamera = async () => {
        const newFacing = facingMode === "user" ? "environment" : "user";
        setFacingMode(newFacing);

        if (isCameraOpen) {
            stopCamera();
            await openCamera(); // restart camera with new facingMode
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); // Start blur & spinner
        setTextDATA("Submitting...");

        const formPayload = new FormData();
        formPayload.append("problemName", formData.problemName);
        formPayload.append("description", formData.description);
        formPayload.append("location", formData.location);
        formPayload.append("time", formData.time);

        try {
            if (formData.image instanceof File) {
                formPayload.append("image", formData.image);
            } else if (typeof formData.image === 'string') {
                const res = await fetch(formData.image);
                const blob = await res.blob();
                formPayload.append("image", blob, "captured.png");
            }

            await new Promise(resolve => setTimeout(resolve, 2000)); // fake delay

            const token = localStorage.getItem('token');
            if (!token) {
                alert("No token found. Please login again.");
                navigate("/login");
                return;
            }

            const response = await axios.post("http://localhost:8080/complaint/submit", formPayload, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data' 
                }
            });

            if (response.status === 200) {
                setSubmitted(true); // show success message
                setTimeout(() => setSubmitted(false), 3000);
            }
        } catch (error) {
            alert("Submission Error: " + (error.response?.data?.message || error.message));
        }

        setIsSubmitting(false);
        setFormData({ problemName: "", description: "", location: "", time: "", image: null });
        setCapturedImage(null);
    };

    return (
        <div>
            <Navbar />
            <div className="relative">
                {isSubmitting && (
                    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="text-white text-lg font-semibold animate-pulse">{textData}</div>
                    </div>
                )}

                {submitted && (
                    <div className="fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50">
                        Complaint submitted successfully!
                    </div>
                )}

                <div className={`transition duration-300 ${isSubmitting ? 'blur-sm pointer-events-none' : ''}`}>
                    <div className="w-full h-250 bg-[url('/main.png')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center pt-12">
                        <div className="w-85 md:w-96 bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold text-center mb-4">Report a Problem</h2>
                            <form onSubmit={handleSubmit} className="flex flex-col">
                                <label>Full Name:</label>
                                <input type="text" name="problemName" value={formData.problemName} onChange={handleChange}
                                    className="mb-3 p-2 bg-gray-700 rounded" required />

                                <label>Problem Description:</label>
                                <textarea name="description" value={formData.description} onChange={handleChange}
                                    className="mb-3 p-2 bg-gray-700 rounded h-24" required></textarea>

                                <label>Location:</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange}
                                    className="mb-3 p-2 bg-gray-700 rounded" required />

                                <label>Time:</label>
                                <input type="datetime-local" name="time" value={formData.time} onChange={handleChange}
                                    className="mb-3 p-2 bg-gray-700 rounded" required />

                                <label>Upload Image:</label>
                                <input type="file" onChange={handleImageChange} accept="image/*"
                                    className="mb-3 p-2 bg-gray-700 rounded " />

                                <p className="text-center my-2">OR</p>

                                <button type="button" onClick={openCamera}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full">
                                    Open Camera
                                </button>

                                <button type="button" onClick={toggleCamera}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 mt-2 rounded w-full">
                                    Switch Camera
                                </button>

                                {isCameraOpen && (
                                    <div className="mt-3">
                                        <video ref={videoRef} autoPlay className="w-full h-63 bg-gray-800 rounded"></video>
                                        <button type="button" onClick={captureImage}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-2 rounded w-full">
                                            Capture Image
                                        </button>
                                    </div>
                                )}

                                {capturedImage && (
                                    <img src={capturedImage} alt="Captured" className="w-full h-full mt-3 rounded" />
                                )}

                                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
                                    Submit Complaint
                                </button>

                                <button type="button" onClick={naviga} className="bg-red-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
                                    Complaint Dashboard
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <canvas ref={canvasRef} className="hidden"></canvas>
            <Footer />
        </div>
    );
};

export default UserHome;
