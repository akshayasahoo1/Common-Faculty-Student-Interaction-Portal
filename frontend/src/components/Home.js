import React from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="/">Student-Faculty Portal</Navbar.Brand>
        <Nav className="ml-auto">
          <Button variant="outline-light" onClick={() => navigate('/login/student')}>Student Login</Button>
          <Button variant="outline-light" onClick={() => navigate('/login/faculty')} className="ml-2">Faculty Login</Button>
          <Button variant="outline-light" onClick={() => navigate('/faqs')} className="ml-2">FAQs</Button>
        </Nav>
      </Navbar>
      <h1 className="mt-5 text-center">Welcome to the Student-Faculty Interaction Portal</h1>
      <p className="text-center">Connect with faculty, manage records, and more!</p>
    </Container>
  );
};

export default Home;