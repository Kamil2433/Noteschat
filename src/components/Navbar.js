import React from 'react'
import Button from "react-bootstrap/Button";
import copy from "copy-to-clipboard";

import { useState } from 'react';




export default function Navbar({id}) {


    const [copyText, setCopyText] = useState(id);

    const handleCopyText = (e) => {
      setCopyText(id);
    };
  
    const copyToClipboard = () => {
      copy(copyText);
      alert("Copied");
    };
  

  return (
    <div className='sticky-top'>
        <div className="float-start  ms-5 mt-3 h2 ">JustChat.com</div>
        <div className="float-end mt-3">
          <span className=" mt-2   w-auto ms-3"><b>Your Id: </b>{id}</span>
          <Button className=" bi bi-clipboard ms-2 " onClick={copyToClipboard}>
            Copy ID
          </Button>
        </div>
      </div>
  )
}
