import React, { useState, useEffect } from 'react';
import axios from 'axios';
function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>

      <div className="user-container">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <img src={user.profileImg} alt={user.fullName} />
            <h2>{user.fullName}</h2>
            <p><strong>Gender:</strong> {user.gender}</p>
            <p><strong>Date of Birth:</strong> {user.dob}</p>
            <p><strong>Address:</strong> {user.address}</p>
            <p><strong>Contact No:</strong> {user.contactNo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllUsers;
