import React from "react";
import { useContext, useState,useCallback ,useEffect} from "react";
import useLocalStoragehook from "../hooks/useLocalStoragehook";
import { useSocket } from "./Sockerprovider";

const Chatcontext = React.createContext();

export function useChat() {
  return useContext(Chatcontext);
}

export function Chatprovider({ ID, children }) {
  const [chat, setchat] = useLocalStoragehook("chat", []);
  const [selectedchat, setselectedchat] = useState(0);
  const [selectedid, setseectedid] = useState(0);
  const socket=useSocket();

  // socket.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");

  
  function createchat(id, name) {

    setchat(prevchat => {
      // prevchat.push({ id, name, messages: [] })
      return [...prevchat, { id, name, messages: [] }];
    });
  }

  //   function createConversation(recipients) {
  //     setConversations(prevConversations => {
  //       return [...prevConversations, { recipients, messages: [] }]
  //     })
  //   }

  function findrecipientinchat(recip) {
    for (let i = 0; i < chat.length; i++) {
      const obj = chat[i];
      if (obj.id === recip) {
        console.log("true" + obj.id);
        return true;
      }
    }
    console.log("false");

    return false;
  }

  const addchattochatbox=useCallback(({ recipient, text, sender })=>{
    console.log({ recipient, text, sender });
     
   
    setchat((prevchat) => {
      // let madechange=findrecipientinchat(recipient)
    const fromme=sender===ID
      let madechange = false;
      const newMessage = { text, fromme};

      // const newConversations = prevchat.map((conversation,idx)=> {

      //   console.log(conversation.name);

      //   if (conversation.id === recipient) {
      //       conversation.messages.push({newMessage});

      //   }
      // });
      let newConversations;
         if(prevchat[0]!=null){
       newConversations = prevchat.map((conversation) => {
        if (conversation.id === recipient) {
          madechange = true;
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }

        return conversation;
      });
         }
      if (madechange) {
        console.log("yes");
        return newConversations;
      } else {
        return prevchat.push({
          id: "Newchat",
          name: "newNmae",
          messages: { newMessage },
        });
      }
    });
  },[setchat])




 const addrecievedmessage=useCallback(({recipient, text, sender})=>{


  setchat((previchat) => {
    // let madechange=findrecipientinchat(recipient)
  const fromme=sender===ID
    let madechange = false;
    const newMessage = { text, fromme};

    // const newConversations = prevchat.map((conversation,idx)=> {

    //   console.log(conversation.name);

    //   if (conversation.id === recipient) {
    //       conversation.messages.push({newMessage});

    //   }
    // });

    let newConversations;
    if(previchat){
     newConversations = previchat.map((conversation) => {
      if (conversation.id === sender) {
        madechange = true;
        return {
          ...conversation,
          messages: [...conversation.messages, newMessage],
        };
      }

      return conversation;
    });
    }
    if (madechange) {
      console.log("yes");
      return newConversations;
    } else {
      createchat(sender,"newchat");
      console.log("new chat created")

     return newConversations = previchat.map((conversation) => {
        if (conversation.id === sender) {
          madechange = true;
          const newMessage = { text, fromme};

          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
          };
        }
  
        return conversation;
      });




    //  addrecievedmessage({recipient,text,sender});


      } }
  );

 },[setchat])



  useEffect(() => {
    if (socket == null) return

    socket.on('receive-message', addrecievedmessage)

    return () => socket.off('receive-message')
  }, [socket, addrecievedmessage])

  function sendmessage(recipient, text) {
    console.log({ recipient, text });
    socket.emit('send-message',{recipient,text})
    console.log("messageg sent")
    addchattochatbox({ recipient, text, sender: ID});
  }

  function setselectedchatid(num) {
    setseectedid(num);
    console.log(num);
  }

  return (
    <Chatcontext.Provider
      value={{
        chat,
        createchat,
        setselectedchat,
        selectedchat,
        addchattochatbox,
        sendmessage,
        setselectedchatid,
        selectedid,
      }}
    >
      {children}
    </Chatcontext.Provider>
  );
}
