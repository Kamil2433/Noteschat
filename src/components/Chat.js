import React from "react";
import { useChat } from "../context/Chatprovider";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';
import Modal from 'react-bootstrap/Modal';  
import Newchatmodal from "./Newchatmodal";
import { useState } from "react";

export default function Chat() {
  const { chat, setselectedchat, selectedchat, setselectedchatid,selectedgroup, setseectedgroup,setselectedname } = useChat();

  // function setthevalue(data, idx) {
  //   setselectedchatid(data);
  // }

  const [show,setmodal]=useState(false);


  const handlemodal=()=>{

     setmodal(true);


  }

  const closethemodal=()=>{

setmodal(false);

  }

  return (
    <>

<Modal  show={show} onHide={closethemodal}>  

<Newchatmodal onHide={closethemodal}/>


</Modal>

    <ListGroup>
      {chat.map((data, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={idx === selectedchat-1}
          onClick={() => {
            setselectedname(data.name)
            setseectedgroup(idx+1)
          }}
          className="text-center"
        >
          <div>{data.name}</div>
        </ListGroup.Item>
         
      ))}



    </ListGroup>
          <Fab color="primary" aria-label="add">
            <AddIcon onClick={handlemodal} />
          </Fab>
         </>
  );
}
