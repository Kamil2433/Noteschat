import React from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
import { useLogin } from "../context/LoginContext.js";
import { useNotes } from "../context/NotesContext.js";

export default function Login({setpropid}) {
  const id = useRef();
  const name = useRef();
  const password = useRef();

  const {
    reggisterauser,
    loginauser,
    setname,
    auth,
    success,
    setsucess,
    setauthtoken
  } = useLogin();

  const [loginview, setview] = useState(true);

  const handlesubmit = async (e) => {
    e.preventDefault();
    setpropid(id.current.value)
    const res = await loginauser(id.current.value, password.current.value);
    setauthtoken(res)
  };

  const handleregisterationsubmit = async (e) => {
    e.preventDefault();

    const res = await reggisterauser(
      id.current.value,
      password.current.value,
      name.current.value
    );
  };

  return loginview === true ? (
    <div style={{ margin: 200 }}>
      <Form onSubmit={handlesubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            ID
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="id" ref={id} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Password" ref={password} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          login
        </Button>{" "}
        <Button onClick={() => setview(false)} variant="secondary">
          Click here to Register
        </Button>{" "}
      </Form>
    </div>
  ) : (
    // registeration
    <div style={{ margin: 200 }}>
      <Form onSubmit={handleregisterationsubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="name" ref={name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            ID
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="id" ref={id} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Password" ref={password} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Register
        </Button>{" "}
        <Button onClick={() => setview(true)} variant="secondary">
          Click here to Login
        </Button>{" "}
      </Form>
    </div>
  );
}
