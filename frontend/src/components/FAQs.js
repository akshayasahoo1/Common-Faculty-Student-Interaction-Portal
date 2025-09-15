import React from 'react';
import { Container, Accordion } from 'react-bootstrap';

const FAQs = () => {
  return (
    <Container className="mt-5">
      <h2>Frequently Asked Questions</h2>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>How do I register?</Accordion.Header>
          <Accordion.Body>Click on 'Register' and fill in your details based on your role (Student or Faculty).</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>What is the login process?</Accordion.Header>
          <Accordion.Body>Use your registered email, password, and role-specific ID (Roll Number for students, Faculty ID for faculty).</Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>How do I submit a record?</Accordion.Header>
          <Accordion.Body>Log in as a student, go to the Dashboard, and fill out the record form.</Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQs;