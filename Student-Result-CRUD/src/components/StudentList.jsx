import React, { useState } from 'react';

const StudentList = ({ students, deleteStudent, editStudent, courses }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedGRNumber, setEditedGRNumber] = useState('');
  const [editedGrade, setEditedGrade] = useState('');
  const [editedCourse, setEditedCourse] = useState('');

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedName(students[index].name);
    setEditedGRNumber(students[index].GRNumber);
    setEditedGrade(students[index].grade);
    setEditedCourse(students[index].course);
  };

  const handleSave = (index) => {
    editStudent(index, {
      name: editedName,
      GRNumber: editedGRNumber,
      grade: editedGrade,
      course: editedCourse
    });
    setEditingIndex(null);
    setEditedName('');
    setEditedGRNumber('');
    setEditedGrade('');
    setEditedCourse('');
  };

  return (
    <div>
      <h2>Student List</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <div>
                <input
                  type="text"
                  placeholder="Student Name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="GR Number"
                  value={editedGRNumber}
                  onChange={(e) => setEditedGRNumber(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={editedGrade}
                  onChange={(e) => setEditedGrade(e.target.value)}
                />
                <select value={editedCourse} onChange={(e) => setEditedCourse(e.target.value)}>
                  <option value="">Select Course</option>
                  {courses.map((course, index) => (
                    <option key={index} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
                <button onClick={() => handleSave(index)}>Save</button>
              </div>
            ) : (
              <div>
                <b>GR Number:</b> {student.GRNumber}, <b>Name:</b> {student.name}, <b>Grade:</b> {student.grade}, <b>Course:</b> {student.course}
                <button onClick={() => deleteStudent(index)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
