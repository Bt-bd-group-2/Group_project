require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

// Middleware to read JSON from request body
app.use(express.json());

app.use((err, req, res, next) => {
    console.err(err.stack);
    res.status(500).json({error: "Something went wrong"});
  });

// In-memory student array. Replace with DB later
let students = [
  { id: 1, name: "Aisha Bello", age: 20, course: "Computer Science" },
  { id: 2, name: "Tunde Ade", age: 22, course: "Mass Comm" }
];

// 1. GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// 2. GET one student by id
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// 3. POST add new student
app.post('/students', (req, res) => {
  const { name, age, course } = req.body;
  
  if (!name || !age || !course) {
    return res.status(400).json({ error: "Name, age, course are required" });
  }

  const newStudent = {
    id: students.length ? students[students.length - 1].id + 1 : 1,
    name,
    age,
    course
  };
  
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// 4. PUT update student
app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, age, course } = req.body;
  if (name) student.name = name;
  if (age) student.age = age;
  if (course) student.course = course;

  res.json(student);
});

// 5. DELETE student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted successfully" });
});

app.get('/fail', (req, res) => {
    throw new Error("Ooops");
  });
  
app.listen(port, () => console.log(`API running on http://localhost:${port}`));