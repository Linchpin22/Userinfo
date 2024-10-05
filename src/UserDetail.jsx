import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const UserDetail = () => {
  const { id } = useParams(); // Get user ID from URL parameters
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State to handle loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        toast.error(err.message); // Show error message as a toast
      } finally {
        setLoading(false); // Set loading to false after fetch is complete
      }
    };

    fetchUser();
  }, [id]); // Fetch user when component mounts or ID changes

  if (loading) {
    return <div className="text-center"><span className="loading loading-bars loading-lg"></span></div>; // Show loading state
  }

  return (
    <div className="container mx-auto p-4">
      <ToastContainer /> 
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600"><strong>Username:</strong> {user.username}</p>
          <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
          <p className="text-gray-600"><strong>Website:</strong> {user.website}</p>
          <p className="text-gray-600"><strong>Company:</strong> {user.company.name}</p>
          <p className="text-gray-600"><strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.zipcode}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
