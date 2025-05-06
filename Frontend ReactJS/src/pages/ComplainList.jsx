import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const ComplaintList = () => {
    const [complaints, setComplaints] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const storedComplaints = JSON.parse(localStorage.getItem('complaints')) || [];
            setComplaints(storedComplaints);

            const token = localStorage.getItem('token');

            try {
                const response = await axios.get("http://localhost:8080/complaint", {
                    headers: {
                        Authorization: `Bearer ${token}`
                      }
                });
                setComplaints(response.data);
            } catch (error) {
                alert("The error is", error);
            }
        }
        fetchData();
    }, []);


    return (
        <div>
            <Navbar />
            {/* <div className="w-full min-h-screen bg-gradient-to-b from-gray-950 via-gray-900  to-gray-800 text-white flex justify-center items-center"> */}
            <div className="w-full h-250 bg-[url('/home.png')] bg-cover bg-center bg-no-repeat text-white flex flex-col items-center pt-12">
                <div className="w-100 md:w-120 max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="md:text-xl font-bold text-center mb-4">User Complaints</h2>
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
                                    {complaint.imageBase64 && (
                                        <img src={complaint.imageBase64} alt="Complaint" className="w-full h-40 object-cover mt-2 rounded-lg" />
                                    )}
                                    <p className="mt-2">
                                        <strong>Status:</strong>
                                        <span className={`text-${complaint.status === 'Resolved' ? 'bg-green-400' : complaint.status === 'In Progress' ? 'bg-yellow-400' : 'bg-red-400'}-500 font-bold ml-2`}>
                                            {complaint.status || "Pending"}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ComplaintList;
