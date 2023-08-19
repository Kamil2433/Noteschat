import React from 'react'
import { Modal, Button, Form, ModalHeader, ModalBody } from 'react-bootstrap';
import Col from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useRef } from 'react';
import {useChat } from "../context/Chatprovider"


export default function Newchatmodal({onHide}) {

    const idref = useRef();
    const nameref = useRef();
     const {createchat}=useChat() ;


  const handlesubmit=(e)=>{
  e.preventDefault();

  createchat(idref.current.value, nameref.current.value);

  onHide();


  }
     


  return (

    <>
    
 <Modal.Header>Create New Chat</Modal.Header>
   
<Modal.Body>
<Form onSubmit={handlesubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Name" ref={nameref} />{" "}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            ID
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="ID " ref={idref} />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary" >
          Create
        </Button>{" "}
       
      </Form>
      </Modal.Body>



</>





   




  )
}
