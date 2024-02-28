import React, { useState } from "react";
import { useContext } from "react";
import useLocalStoragehook  from "../hooks/useLocalStorage";


// import useAlertenvokefunction from '../hooks/useAlertenvoke';

const LogContext = React.createContext();

export function useLogin() {
  return useContext(LogContext);
}

export default function LoginContext({ children }) {

  const [authtoken, setauthtoken] = useLocalStoragehook("authtoken","");
  const [name, setname] = useLocalStoragehook("name", "");
  const [success, setsucess] = useState(false);

  const [messagefromlogin, setmessagel] = useState();

  const [setvariantfromlogin, setvariantl] = useState();

  async function loginauser(inputid, inputpassword) {
    // const {setalert,setmessage}=Notescontext()

    try {
      const response = await fetch("http://localhost:3200/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ id: inputid, password: inputpassword }),
      });
      const res = await response.json();
      setauthtoken(res);
      console.log(res);
      
      localStorage.setItem("Cloudnoteauthtoken",JSON.stringify(res));

      if (response.ok) {
        // getname(inputid, inputpassword, res);

        getname(inputid,inputpassword,res)
          console.log("here is")
        console.log(authtoken)
        return res;

          

  
        // useAlertenvokefunction("Login Successful")

        // setalert(true)
        // setmessage('Login Successful')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getname = async (givenid, givenpassword, resp) => {
    // console.log(auth)
  await  setauthtoken(resp);

    const response = await fetch(
      "https://cloudnote-backend-etc8.onrender.com/api/auth/getuser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "auth-token": resp,
        },
        body: JSON.stringify({ id: givenid, password: givenpassword }),
      }
    );

    const res = await response.json();
    // console.log(res);
    setname(res.name);

    // fetchnotes()
  };

  async function reggisterauser(inputid, inputpassword, inputname) {
    // const {setalert,setmessage}=Notescontext()

    try {
      var formdata = { id: inputid, password: inputpassword, name: inputname };

      console.log(JSON.stringify(formdata));

      const response = await fetch(
        "https://cloudnote-backend-etc8.onrender.com/api/auth/reg",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(formdata),
        }
      );
      const res = await response.json();

      if (response.ok) {
        setmessagel("User Register Successful");

        const set = await setsucess(true);
      } else {
        setvariantl("danger");
        setmessagel("User Register Unuccessful, ID unavailable");

        const aw = await setsucess(false);
      }

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LogContext.Provider
      value={{
        loginauser,
        reggisterauser,
        authtoken,
        setauthtoken,
        name,
        setname,
        success,
        setsucess,
        messagefromlogin,
        setvariantfromlogin,
        setmessagel,
        setvariantl,
      }}
    >
      {children}
    </LogContext.Provider>
  );
}
