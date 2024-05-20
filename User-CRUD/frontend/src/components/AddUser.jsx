import React, { useState } from 'react';
import axios from 'axios';

function AddUser() {
  const [userData, setUserData] = useState({
    fullName: '',
    gender: '',
    dob: '',
    address: '',
    contactNo: '',
    profileImg: ''
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/addUser', userData);
      console.log(response.data);
      setSuccess(true);
      setError(false);
    //reset fields after submission
      setUserData({
        fullName: '',
        gender: '',
        dob: '',
        address: '',
        contactNo: '',
        profileImg: ''
      });
    } catch (error) {
      console.error(error);
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <div className="add-user-container">
      <h1>Add User Details</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleChange} required />
        <select name="gender" value={userData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="date" name="dob" placeholder="Date of Birth" value={userData.dob} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Address" value={userData.address} onChange={handleChange} required />
        <input type="tel" name="contactNo" placeholder="Contact No" value={userData.contactNo} onChange={handleChange} required />
        <input type="url" name="profileImg" placeholder="Profile Image URL" value={userData.profileImg} onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
      {success && <p style={{ color: 'green' }}>User added successfully!</p>}
      {error && <p style={{ color: 'red' }}>An error occurred. Please try again.</p>}
    </div>
  );
}

export default AddUser;
