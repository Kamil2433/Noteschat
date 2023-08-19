import React from "react";
import Sidebar from "./Sidebar";
import { useChat } from "../context/Chatprovider";
import Openchatbox from "./Openchatbox";



export default function Dashboard({id}) {
const {selectedchat}=useChat();


return(

    <div className="d-flex ">
<Sidebar  id={id}/>


{selectedchat!==0?<Openchatbox/>:<h2  className="ms-4 text-center">      No chats</h2>}


</div>

)
 
}
