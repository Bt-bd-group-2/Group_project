
require('dotenv').config();

const express = require('express');
const path =require('path');
const app = express();
const port = process.env.PORT || 3030;

// Middleware to read JSON from request body
app.use(express.json());

//Middleware to send static file
app.use(express.static(path.join(__dirname, 'public')));


//this Middleware for login the to the terminal
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date}`);
  next();
});

// +In-memory student array. Replace with DB later
let students = [
  { id: 1, name: "Aisha Bello", age: 20, course: "Computer Science" },
  { id: 2, name: "Tunde Ade", age: 22, course: "Mass Comm" },
  { id: 3, name: "Doyin Adetunji", age: 27, course: "Cybersecurity" },
  { id: 4, name: "Odeyinka Tobiloba", age: 27, course: "Computer Science"},
  { id: 5, name: "Aminieli", age: 22, course: "Cyber Security" },
  { id: 6, name: "Lovelyn Kalu", age: 24, course: "Software Engineering" },
  { id: 7, name: "Chiamaka Eze", age: 21, course: "Mass Communication" },
  { id: 8, name: "Oyinseye Okikiolaoluwa", age: 17, course: "Computer Science" },
  { id: 9, name: "Omoloye Hassan", age: 20, course: "Computer Science" },
  {id: 10, name: "Aries Tobells", age:94, course: "Yoruba Technology" },
  {id: 11, name: "Delphine Uwineza", age:22, course: "Software Engineering" },
  {id: 12, name: "Akande Imran", age:34, course: "Software development" },
  {id: 13, name: "Winstill Akoh Sani", age: 15, course: "Medicine" },
  {id: 14, name: "Olaoluwa-femi Femi Solomon Babalola", age:44, course: "Computer Science"}
];

// 1. GET all students
app.get('/students', (req, res) => {
  res.json(students);
});

// 2. GET one student by id
app.get('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
    return res.status(400).json({
      error: `Invalid student ID, ${req.params.id} is not a number`
    });
  }

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
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      error: `Invalid student ID, ${id} is not a number`
    });
  }

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  const { name, age, course } = req.body;
  if (name !== undefined) student.name = name;
  if (age !== undefined) student.age = age;
  if (course !== undefined) student.course = course;

  res.json(student);
});

// 5. DELETE student
app.delete('/students/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({
      error: `Invalid student ID, ${req.params.id} is not a number`
    });
  }

  const student = students.find(s => s.id === id);
  if (!student) return res.status(404).json({ error: "Student not found" });

  students = students.filter(s => s.id !== id);
  res.json({ message: "Student deleted successfully" });
});

//6. if some goes to "/" show index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//is the rough for get fail request
app.get('/fail', (req, res) => {
    throw new Error("Ooops");
  });


//Middleware to handle error messages
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});
  
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
