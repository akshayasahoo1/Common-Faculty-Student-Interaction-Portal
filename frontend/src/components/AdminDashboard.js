import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/auth/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      setUsers(users.filter(user => user._id !== id));
      toast.success('User deleted!');
    } catch (err) {
      setError('Deletion failed');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td><Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default AdminDashboard;