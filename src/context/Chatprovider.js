import React from "react";
import { useContext, useState, useCallback, useEffect } from "react";
import useLocalStoragehook from "../hooks/useLocalStorage";

const Chatcontext = React.createContext();

export function useChat() {
  return useContext(Chatcontext);
}

export function Chatprovider({ ID, children }) {
  const [id, setid] = useLocalStoragehook("id", "");
  const [chat, setchat] = useLocalStoragehook("chat", []);
  const [selectedchat, setselectedchat] = useState(0);
  const [selectedgroup, setseectedgroup] = useState(0);
  const [selectedname, setselectedname] = useState();
  const [auth, setauth] = useState(localStorage.getItem("Cloudnoteauthtoken"));

  // socket.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");


  //function to create new group
  async function creategroup(inname, incolor) {
    console.log(auth);
    const au = JSON.parse(auth);

    const response = await fetch("http://localhost:3200/api/notes/addgroup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "auth-token": `${au}`,
      },
      body: JSON.stringify({ name: inname, color: incolor }),
    });
    const res = await response.json();

    fetchgroup();
  }


  //function to fetch notes
  async function fetchgroup() {
    console.log(auth);
    const au = JSON.parse(auth);

    const response = await fetch("http://localhost:3200/api/notes/getnotes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "auth-token": `${au}`,
      },
    });
    const res = await response.json();
    setchat(res);
    console.log(chat);
  }


  //function to add notes
  async function addnote(indescription) {
    console.log(auth);
    const au = JSON.parse(auth);

    const response = await fetch("http://localhost:3200/api/notes/addnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "auth-token": `${au}`,
      },
      body: JSON.stringify({ description: indescription, group: selectedname }),
    });
    const res = await response.json();

    fetchgroup();
    console.log(chat);
  }

  return (
    <Chatcontext.Provider
      value={{
        chat,
        selectedgroup,
        creategroup,
        fetchgroup,
        selectedname,
        setselectedname,
        addnote,
        setseectedgroup,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
}
