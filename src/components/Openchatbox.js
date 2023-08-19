import React from "react";
import { Button } from "react-bootstrap";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useChat } from "../context/Chatprovider";

export default function Openchatbox() {
  
  const{sendmessage,selectedid,chat}=useChat();

  const [text, settext] = useState('');

    

  function handlesubmit(e){
       e.preventDefault();
       sendmessage(selectedid,text)
       console.log(selectedid)
       settext("")

  }

  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">

      {chat.map((conv, index) => {
            // const lastMessage = selectedConversation.messages.length - 1 === index
if(conv.id===selectedid){

          if(conv.messages.length>0){


   return (    conv.messages.map((message,idx)=>{

          


            return (
              <div
                // ref={lastMessage ? setRef : null}
                key={idx}
                className={`my-1 d-flex flex-column me-3   ${message.fromme ? 'align-self-end align-items-end' : 'align-items-start'}`}
              >
                <div
                  className={`rounded px-2 py-1 me-3 ${message.fromme ? 'bg-primary text-white' : 'border ms-3 '}`}>
                  {message.text}
                </div>
                <div className={`text-muted small me-3 ${message.fromme ? 'text-right' : ''}`}>
                  {message.fromme ? 'You' : ' '}
                </div>
              </div>
            )
              })  )}  }})}




      </div>

      <Form onSubmit={handlesubmit}>
        <Form.Group>
          <InputGroup>
            <Form.Control
              as="textarea"
              required
              value={text}
              onChange={e=>settext(e.target.value)}
              style={{ height: "80px", resize: "none" }}
            />
          
              <Button type="submit">Send</Button>
          
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  )
}
