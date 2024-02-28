import React from 'react'
import { Modal, Button, Form, ModalHeader, ModalBody } from 'react-bootstrap';
import Col from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useRef } from 'react';
import {useChat } from "../context/Chatprovider"


export default function Newchatmodal({onHide}) {

    const colorref = useRef();
    const nameref = useRef();
     const {creategroup}=useChat() ;


  const handlesubmit=(e)=>{
  e.preventDefault();

  // createchat(idref.current.value, nameref.current.value);
  creategroup(nameref.current.value,colorref.current.value)

  onHide();


  }
     


  return (

    <>
    
 <Modal.Header>Create New Note</Modal.Header>
   
<Modal.Body>
<Form onSubmit={handlesubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Desciption
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Name" ref={nameref} />{" "}
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Color
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="ID " ref={colorref} />
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
