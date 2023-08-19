import React from "react";
import { useChat } from "../context/Chatprovider";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default function Chat() {
  const { chat, setselectedchat, selectedchat, setselectedchatid } = useChat();

  // function setthevalue(data, idx) {
  //   setselectedchatid(data);
  // }

  return (
    <ListGroup>
      {chat.map((data, idx) => (
        <ListGroup.Item
          key={idx}
          action
          active={idx === selectedchat-1}
          onClick={() => {
            setselectedchatid(data.id);
            setselectedchat(idx+1);
          }}
          className="text-center"
        >
          <div>{data.name}</div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
