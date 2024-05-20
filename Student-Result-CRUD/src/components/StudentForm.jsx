import React, { useState } from 'react';

const StudentForm = ({ addStudent, courses }) => {
  const [name, setName] = useState('');
  const [GRNumber, setGRNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [course, setCourse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !GRNumber || !grade || !course) return;
    addStudent({ name, GRNumber, grade, course });
    setName('');
    setGRNumber('');
    setGrade('');
    setCourse('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="GR Number"
        value={GRNumber}
        onChange={(e) => setGRNumber(e.target.value)}
      />
      <input
        type="text"
        placeholder="Grade"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
      />
      <select value={course} onChange={(e) => setCourse(e.target.value)}>
        <option value="">Select Course</option>
        {courses.map((course, index) => (
          <option key={index} value={course}>
            {course}
          </option>
        ))}
      </select>
      <button type="submit">Add Student</button>
    </form>
  );
};

export default StudentForm;
