import React from "react";
import Sidebar from "./Sidebar";
import { useChat } from "../context/Chatprovider";
import Openchatbox from "./Openchatbox";
import { useEffect } from "react";



export default function Dashboard({id}) {
const {selectedchat,fetchgroup}=useChat();


useEffect(() => {
  
        fetchgroup()
  
}, [])






return(

    <div className="d-flex ">
<Sidebar  id={id}/>


{selectedchat!==0?<Openchatbox/>:<h2  className="ms-4 text-center">      No Notes</h2>}


</div>

)
 
}
