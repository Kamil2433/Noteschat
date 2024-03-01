import React from "react";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useChat } from "../context/Chatprovider";
// import {useEffect } from "react";
// import useLocalStoragehookfil from "../hooks/useLocalstoragefile";

//       }
//   }, []);

export default function Openchatbox() {
  const { selectedgroup, chat, addnote,selectedname } = useChat();
  // const [img,setimg]=useLocalStoragehookfil("img",[])

  const [text, settext] = useState("");

  function handlesubmit(e) {
    e.preventDefault();

    addnote(text);

    settext(" ");
  }

  function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear()).slice(2); // Extracting last two digits

    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Formatted date and time string
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = ` ${hours}:${minutes}`;

    return   formattedDate + formattedTime ;
}

  return (
    <>
      <div className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1 overflow-auto">
          {chat.map((conv, index) => {
            // const lastMessage = selectedConversation.messages.length - 1 === index
            if (conv.name === selectedname) {
              if (conv.notes.length > 0) {
                return conv.notes.map((note, idx) => {
                  return (
                    <div className="card mb-3 m-2 " style={{maxWidth:"540px"}}> 
                    <div className="row g-0"> 
                        <div class="col-md-6"> 
                           
                        <div class="col-md-6"> 
                            <div class="card-body"> 
                              
                                <p class="card-text"> 
                                  {note.description}
                                </p> 
                                <p class="card-text"> 
                                    <small class="text-muted"> 
                                       {formatDateTime(note.date)}
                                    </small> 
                                </p> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
                    
                  );
                });
              }
            }
          })}
        </div>

        <Form>
          <Form.Group>
            <InputGroup>
              <Form.Control
                as="textarea"
                required
                value={text}
                onChange={(e) => settext(e.target.value)}
                style={{ height: "80px", resize: "none" }}
              />

              {/* <input type="file" id="myFile" name="filename" class="fa-solid fa-paperclip fa-1x"></input> */}

              <Button onClick={handlesubmit}>Add</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    </>
  );
}
