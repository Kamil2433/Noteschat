import React from "react";
import Login from "./Login";
import { useState } from "react";
import Dashboard from "./Dashboard";
import useLocalStoragehook  from "../hooks/useLocalStorage";
import Navbar from "./Navbar";
import ListGroup from 'react-bootstrap/ListGroup';
import {Chatprovider} from "../context/Chatprovider"
import LoginContext from "../context/LoginContext"

export default function App() {
  const [idforlogin, setidl] = useLocalStoragehook("idforlogin","");
  const [name, setname] = useState();

  


 

  return idforlogin ? (
    <div>

      <ListGroup>
      <Navbar  id={idforlogin}  />
      <Chatprovider ID={idforlogin}>
   <Dashboard id={idforlogin}/>
    </Chatprovider>
      </ListGroup>
    </div>
  ) : (
    <LoginContext>
    <Login setpropid={setidl} setgivenname={setname} />
      </LoginContext>
  );
}
