import React, { useState, useEffect } from 'react';

function App() {
  const [students, setStudents] = useState([]);

  // Fetch data from the Engine every time the page loads
  useEffect(() => {
    fetch('http://localhost:5000/students')
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error("Error connecting:", err));
  }, []);

  return (
    <div style={{ padding: "50px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>IBM Class List</h1>
      <p><em>(Use Postman to add new students)</em></p>
      
      {students.length > 0 ? (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {students.map((student) => (
            <li key={student.id} style={{ 
              background: "#f4f4f4", 
              margin: "10px auto", 
              padding: "15px", 
              width: "300px",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"
            }}>
              <strong style={{fontSize: "18px"}}>{student.name}</strong> 
              <br/> 
              <span style={{color: "gray"}}>Dept: {student.dept}</span>
              <br/>
              <span style={{color: "blue", fontWeight: "bold"}}>Age: {student.age}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;