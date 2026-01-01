const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// --- Middleware ---
app.use(cors());
app.use(bodyParser.json());

// --- 1. DATA STORAGE (In-Memory Array) ---
let students = [
    { id: 1, name: "Purushothaman", dept: "ECE", age: 21 },
    { id: 2, name: "Ravi", dept: "AI&ML", age: 22 },
    { id: 3, name: "Suriya", dept: "EEE", age: 23 },
    { id: 4, name: "RAM", dept: "IT", age: 20 }
];

// --- 2. READ (GET Request) ---
app.get('/students', (req, res) => {
    res.json(students);
});

// --- 3. CREATE (POST Request) ---
app.post('/students', (req, res) => {
    const newStudent = req.body;

    if (!newStudent.name || !newStudent.dept) {
        return res.status(400).json({ msg: "Please include name and department" });
    }

    newStudent.id = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    students.push(newStudent);
    res.json(students);
});

// --- 4. UPDATE (PUT Request) ---
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedData = req.body;

    const index = students.findIndex(student => student.id === id);

    if (index !== -1) {
        // Merge existing data with updated data
        students[index] = { ...students[index], ...updatedData };
        res.json(students);
    } else {
        res.status(404).json({ message: "Student not found!" });
    }
});

// --- 5. START SERVER ---
// Fixed the syntax error by using backticks (`) below
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});