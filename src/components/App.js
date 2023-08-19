import React from "react";
import Login from "./Login";
import { useState } from "react";
import Dashboard from "./Dashboard";
import useLocalStoragehook from "../hooks/useLocalStoragehook";
import Navbar from "./Navbar";
import ListGroup from 'react-bootstrap/ListGroup';
import {Chatprovider} from "../context/Chatprovider"
import { SocketProvider } from "../context/Sockerprovider";


export default function App() {
  const [id, setid] = useLocalStoragehook("id","");
  const [name, setname] = useState();


 

  return id ? (
    <div>
      <ListGroup>
<SocketProvider id={id}>
      <Navbar  id={id}  />
      <Chatprovider ID={id}>
   <Dashboard id={id}/>
    </Chatprovider>
    </SocketProvider>
      </ListGroup>
    </div>
  ) : (
    <Login setgivenid={setid} setgivenname={setname} />
  );
}
