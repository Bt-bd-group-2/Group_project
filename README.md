# Student Record API

This project is an Express.js API for managing student records with CRUD endpoints.

## Run the project

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run dev
```

3. Open the API in your browser or Postman:

```text
http://localhost:3030
```

## What each group member should do

When you clone this project, your contribution should be small, clear, and easy to merge into the main branch.

1. Open [index.js](index.js) and add one student object inside the in-memory `students` array.
2. Use your own name, age, and course so each member adds a unique record.
3. Run the app and check that `GET /students` shows your new entry.
4. Make your change on a separate branch, not directly on `main`.
5. Commit only your own contribution with a clear message, for example:

```bash
git add index.js
git commit -m "Add student record for [Your Name]"
```

6. Push your branch and open a pull request or merge request into `main`.
7. If another member already added a record, do not overwrite it. Merge their changes first, then add yours.

## API endpoints

- `GET /students` - view all students
- `GET /students/:id` - view one student
- `POST /students` - add a student
- `PUT /students/:id` - edit a student
- `DELETE /students/:id` - remove a student

## Postman

Import the collection from [postman/student-record-api.postman_collection.json](postman/student-record-api.postman_collection.json).
