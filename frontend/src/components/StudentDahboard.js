import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Table } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentDashboard = () => {
  const [personalInfo, setPersonalInfo] = useState({ name: '', email: '' });
  const [academicInfo, setAcademicInfo] = useState({ rollNumber: '', department: '' });
  const [projects, setProjects] = useState('');
  const [lorRequest, setLorRequest] = useState('');
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/records/student`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(response.data);
      } catch (err) {
        setError('Failed to fetch records');
      }
    };
    fetchRecords();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.REACT_APP_API_URL}/api/records/submit`, {
        personalInfo,
        academicInfo,
        projects,
        lorRequest
      }, { headers: { Authorization: `Bearer ${token}` } });
      toast.success('Record submitted!');
      setPersonalInfo({ name: '', email: '' });
      setAcademicInfo({ rollNumber: '', department: '' });
      setProjects('');
      setLorRequest('');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Student Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <h4>Personal Information</h4>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={personalInfo.name} onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={personalInfo.email} onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })} required />
        </Form.Group>
        <h4 className="mt-4">Academic Information</h4>
        <Form.Group controlId="formRollNumber">
          <Form.Label>Roll Number</Form.Label>
          <Form.Control type="text" value={academicInfo.rollNumber} onChange={(e) => setAcademicInfo({ ...academicInfo, rollNumber: e.target.value })} required />
        </Form.Group>
        <Form.Group controlId="formDepartment">
          <Form.Label>Department</Form.Label>
          <Form.Control type="text" value={academicInfo.department} onChange={(e) => setAcademicInfo({ ...academicInfo, department: e.target.value })} required />
        </Form.Group>
        <h4 className="mt-4">Projects</h4>
        <Form.Group controlId="formProjects">
          <Form.Control as="textarea" rows={3} value={projects} onChange={(e) => setProjects(e.target.value)} />
        </Form.Group>
        <h4 className="mt-4">LOR Request</h4>
        <Form.Group controlId="formLorRequest">
          <Form.Control as="textarea" rows={3} value={lorRequest} onChange={(e) => setLorRequest(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Submit Record</Button>
      </Form>
      <h4 className="mt-5">Previous Records</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Projects</th>
            <th>LOR Request</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.personalInfo.name}</td>
              <td>{record.personalInfo.email}</td>
              <td>{record.academicInfo.rollNumber}</td>
              <td>{record.academicInfo.department}</td>
              <td>{record.projects}</td>
              <td>{record.lorRequest}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default StudentDashboard;