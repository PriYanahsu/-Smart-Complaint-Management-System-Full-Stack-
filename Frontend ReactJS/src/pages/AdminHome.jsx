import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AdminHome = () => {
    const [complaints, setComplaints] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'text-red-500';
            case 'In Progress':
                return 'text-yellow-500';
            case 'Resolved':
                return 'text-green-500';
            default:
                return 'text-red-500';
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
        setComplaints(storedComplaints);

        try {
            const response = await axios.get("http://localhost:8080/complaint");
            setComplaints(response.data);
        } catch (error) {
            alert(`The error occurred: ${error}`);
        }
    };

    const updateStatus = (index, newStatus) => {
        const updatedComplaints = complaints.map((complaint, i) =>
            i === index ? { ...complaint, status: newStatus } : complaint
        );

        setComplaints(updatedComplaints);
        localStorage.setItem('complaints', JSON.stringify(updatedComplaints));
    };

    const deleteComplaint = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/complaint/${id}`, { status: "Deleted" });
            alert("Complaint is marked as deleted");
            fetchData();
        } catch (error) {
            alert(`The error is ${error}`);
        }
    };

    return (
        <div>
            <Navbar />
            {/* <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800 text-white flex justify-center items-center"> */}
            <div className="w-full h-250 bg-[url('/home.png')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center pt-12">
                <div className="w-100 md:w-120 max-w-4xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="md:text-2xl font-bold text-center mb-4">Admin Dashboard</h2>
                    {complaints.length === 0 ? (
                        <p className="text-center">No complaints submitted yet.</p>
                    ) : (
                        <div className="space-y-2 md:space-y-4">
                            {complaints.map((complaint, index) => (
                                <div key={index} className="bg-gray-700 p-4 rounded-lg">
                                    <h3 className="text-lg font-bold">{complaint.problemName}</h3>
                                    <p><strong>Description:</strong> {complaint.description}</p>
                                    <p><strong>Location:</strong> {complaint.location}</p>
                                    <p><strong>Time:</strong> {complaint.time}</p>

                                    {/* {complaint.image && (
                                        <img
                                            src={complaint.image}
                                            alt="Complaint"
                                            className="w-20 h-20 object-cover mt-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                                            onClick={() => setSelectedImage(complaint.image)}
                                        />
                                    )} */}

                                    {complaint.imageBase64 && (
                                        <img
                                            src={complaint.imageBase64}
                                            alt="Complaint"
                                            className="w-20 h-20 object-cover mt-2 rounded-lg cursor-pointer transition-transform transform hover:scale-105"
                                            onClick={() => setSelectedImage(complaint.imageBase64)}
                                        />
                                    )}

                                    <p className="mt-2">
                                        <strong>Status:</strong>
                                        <span className={`${getStatusColor(complaint.status)} font-bold ml-2`}>
                                            {complaint.status || "Pending"}
                                        </span>
                                    </p>

                                    <div className="mt-3">
                                        <button className="bg-red-500 px-3 py-1 rounded-md mx-1" onClick={() => updateStatus(index, "Pending")}>Pending</button>
                                        <button className="bg-yellow-500 px-3 py-1 rounded-md mx-1" onClick={() => updateStatus(index, "In Progress")}>In Progress</button>
                                        <button className="bg-green-500 px-3 py-1 rounded-md mx-1" onClick={() => updateStatus(index, "Resolved")}>Resolved</button>
                                        <button className="bg-gray-700 px-3 py-1 rounded-md mx-1" onClick={() => deleteComplaint(complaint.id)}>🗑 Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedImage && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center z-50">
                    <div className="relative">
                        <img src={selectedImage} alt="Complaint" className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg" />
                        <button
                            className="absolute top-2 right-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xl"
                            onClick={() => setSelectedImage(null)}
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default AdminHome;
