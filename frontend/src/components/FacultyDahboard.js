import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FacultyDashboard = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/records/faculty`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRecords(response.data);
      } catch (err) {
        setError('Failed to fetch records');
      }
    };
    fetchRecords();
  }, []);

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/records/approve/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setRecords(records.map(record => record._id === id ? { ...record, status: 'approved' } : record));
      toast.success('Record approved!');
    } catch (err) {
      setError('Approval failed');
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.REACT_APP_API_URL}/api/records/reject/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
      setRecords(records.map(record => record._id === id ? { ...record, status: 'rejected' } : record));
      toast.success('Record rejected!');
    } catch (err) {
      setError('Rejection failed');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Faculty Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Roll Number</th>
            <th>Department</th>
            <th>Projects</th>
            <th>LOR Request</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>{record.personalInfo.name}</td>
              <td>{record.personalInfo.email}</td>
              <td>{record.academicInfo.rollNumber}</td>
              <td>{record.academicInfo.department}</td>
              <td>{record.projects}</td>
              <td>{record.lorRequest}</td>
              <td>{record.status || 'pending'}</td>
              <td>
                <Button variant="success" onClick={() => handleApprove(record._id)} className="mr-2">Approve</Button>
                <Button variant="danger" onClick={() => handleReject(record._id)}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default FacultyDashboard;