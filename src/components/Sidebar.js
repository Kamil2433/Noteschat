import React, { useState } from "react";
import { Tab, Nav ,Button} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';  
import Chat from "./Chat";
import Newchatmodal from "./Newchatmodal";


export default function Sidebar({ id }) {
  const [activeKey, setactivekey] = useState("chats_col");
  const [show,setmodal]=useState(false);


  const handlemodal=()=>{

     setmodal(true);


  }

  const closethemodal=()=>{

setmodal(false);

  }



  return (
    <div style={{ width: "30%" ,borderRight:"2px solid blue" , borderColor:"#87aade",height:"90vh"}} className="d-flex flex-column border-right">
      <Tab.Container
        activeKey={activeKey}
        onSelect={setactivekey}
        className="border-right"
      >
        <Nav variant="tabs" className="justify-content-center border-right">
          <Nav.Item className="me-3 mt-4">
            <Nav.Link eventKey="chats_col">Chats</Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-5 mt-4">
            <Nav.Link eventKey="newchat" >
              New Chat
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="justify-content-center">
          <Tab.Pane eventKey="chats_col">
             <Chat /> 
          </Tab.Pane>

          <Tab.Pane eventKey="newchat" >
            <Button className="ms-5 mt-5 justify-content-center" onClick={handlemodal}>Create New Chat</Button>

                  <Modal  show={show} onHide={closethemodal}>  

                    <Newchatmodal onHide={closethemodal}/>
                    

                  </Modal>


          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}
