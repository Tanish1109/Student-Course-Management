import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('lab_students');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Tanish Sheth", email: "tanish@example.com" },
      { id: 2, name: "Sam", email: "sam@example.com" }
    ];
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('lab_courses');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: "React Web Development", duration: "4 Weeks" },
      { id: 2, title: "JavaScript Fundamentals", duration: "3 Weeks" }
    ];
  });

  useEffect(() => {
    localStorage.setItem('lab_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('lab_courses', JSON.stringify(courses));
  }, [courses]);

  // Form States
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [editingStudentId, setEditingStudentId] = useState(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [courseDuration, setCourseDuration] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);

  // --- Student CRUD ---
  const handleStudentSubmit = (e) => {
    e.preventDefault();
    if (!studentName || !studentEmail) return alert('Please fill all fields');

    if (editingStudentId) {
      setStudents(students.map(s => s.id === editingStudentId ? { ...s, name: studentName, email: studentEmail } : s));
      setEditingStudentId(null);
    } else {
      const newStudent = { id: Date.now(), name: studentName, email: studentEmail };
      setStudents([...students, newStudent]);
    }
    setStudentName('');
    setStudentEmail('');
  };

  const editStudent = (s) => {
    setEditingStudentId(s.id);
    setStudentName(s.name);
    setStudentEmail(s.email);
  };

  const deleteStudent = (id) => {
    if (confirm('Delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  // --- Course CRUD ---
  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!courseTitle || !courseDuration) return alert('Please fill all fields');

    if (editingCourseId) {
      setCourses(courses.map(c => c.id === editingCourseId ? { ...c, title: courseTitle, duration: courseDuration } : c));
      setEditingCourseId(null);
    } else {
      const newCourse = { id: Date.now(), title: courseTitle, duration: courseDuration };
      setCourses([...courses, newCourse]);
    }
    setCourseTitle('');
    setCourseDuration('');
  };

  const editCourse = (c) => {
    setEditingCourseId(c.id);
    setCourseTitle(c.title);
    setCourseDuration(c.duration);
  };

  const deleteCourse = (id) => {
    if (confirm('Delete this course?')) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 text-primary">Student & Course Management System</h1>
      
      {/* Student Section */}
      <div className="card p-4 mb-5 shadow-sm">
        <h3>{editingStudentId ? 'Edit Student' : 'Add New Student'}</h3>
        <form onSubmit={handleStudentSubmit} className="row g-3">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Full Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} />
          </div>
          <div className="col-md-5">
            <input type="email" className="form-control" placeholder="Email Address" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">{editingStudentId ? 'Update' : 'Add'}</button>
          </div>
        </form>

        <h4 className="mt-4">Student List</h4>
        <table className="table table-striped mt-2">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editStudent(s)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(s.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Section */}
      <div className="card p-4 shadow-sm">
        <h3>{editingCourseId ? 'Edit Course' : 'Add New Course'}</h3>
        <form onSubmit={handleCourseSubmit} className="row g-3">
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Course Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
          </div>
          <div className="col-md-5">
            <input type="text" className="form-control" placeholder="Duration" value={courseDuration} onChange={(e) => setCourseDuration(e.target.value)} />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-success w-100">{editingCourseId ? 'Update' : 'Add'}</button>
          </div>
        </form>

        <h4 className="mt-4">Course List</h4>
        <table className="table table-striped mt-2">
          <thead>
            <tr><th>Title</th><th>Duration</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {courses.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.duration}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => editCourse(c)}>Edit</button>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteCourse(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;