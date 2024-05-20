import React, { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

function App() {
  const [students, setStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const courses = ['BTech IT', 'BTech ICT', 'BTech CS'];

  const addStudent = (student) => {
    setStudents([...students, student]);
  };

  const deleteStudent = (index) => {
    const newStudents = [...students];
    newStudents.splice(index, 1);
    setStudents(newStudents);
  };

  const editStudent = (index, updatedStudent) => {
    const newStudents = [...students];
    newStudents[index] = updatedStudent;
    setStudents(newStudents);
  };

  const filteredStudents = students.filter((student) =>
    student.GRNumber.includes(searchInput)
  );

  return (
    <div className="App">
      <h1>Student Result Management</h1>
      <StudentForm addStudent={addStudent} courses={courses} />
      <hr/>
      <input
        type="text"
        placeholder="Search by GR Number"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <StudentList
        students={filteredStudents}
        deleteStudent={deleteStudent}
        editStudent={editStudent}
        courses={courses}
      />
    </div>
  );
}

export default App;
