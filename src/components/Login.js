import React from "react";
import Button from "react-bootstrap/Button";
import { useRef } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { v4 as uuidv4 } from "uuid";

export default function Login({ setgivenid, setgivenname }) {
  const id = useRef();
  const name = useRef();

  function generatenewid() {
    setgivenid(uuidv4());
  }

  const handlesubmit = (e) => {
    e.preventDefault();

    setgivenid(id.current.value);
    setgivenname(name.current.value);
  };

  return (
    <div style={{ margin: 200 }}>
      <Form onSubmit={handlesubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="Name" placeholder="Name" ref={name} />{" "}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            ID
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="ID" ref={id} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          login
        </Button>{" "}
        <Button onClick={generatenewid} variant="secondary">
          Generate New Id
        </Button>{" "}
      </Form>
    </div>
  );
}
