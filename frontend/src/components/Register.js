import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ role }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rollNumber, setRollNumber] = useState(''); // For students
  const [facultyId, setFacultyId] = useState(''); // For faculty
  const [department, setDepartment] = useState(''); // For students
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = role === 'student' ? '/api/auth/student-register' : '/api/auth/faculty-register';
      const data = role === 'student' ? { name, email, password, rollNumber, department } : { name, email, password, facultyId };
      await axios.post(`${process.env.REACT_APP_API_URL}${endpoint}`, data);
      toast.success(`Registered as ${role}! Please login.`);
      navigate(`/login/${role}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Container className="mt-5">
      <h2>{role === 'student' ? 'Student Registration' : 'Faculty Registration'}</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Form.Group>
        {role === 'student' && (
          <>
            <Form.Group controlId="formRollNumber">
              <Form.Label>Roll Number</Form.Label>
              <Form.Control type="text" value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="formDepartment">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" value={department} onChange={(e) => setDepartment(e.target.value)} required />
            </Form.Group>
          </>
        )}
        {role === 'faculty' && (
          <Form.Group controlId="formFacultyId">
            <Form.Label>Faculty ID</Form.Label>
            <Form.Control type="text" value={facultyId} onChange={(e) => setFacultyId(e.target.value)} required />
          </Form.Group>
        )}
        <Button variant="primary" type="submit" className="mt-3">Register</Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default Register;