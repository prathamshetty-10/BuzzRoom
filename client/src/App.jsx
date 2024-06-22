import { useState } from 'react'
import Chat from './chat.jsx'

import io from 'socket.io-client'
const socket=io.connect("http://localhost:3001");//backend 


function App() {
  const [signupData,setSignupData]=useState({
    username:"",
    room:""
  })
  
  const [showChat, setShowChat] = useState(false);
  function handleUserInput(e){
    const {name,value}=e.target;
    setSignupData({
        ...signupData,
        [name]:value
    })
}

  const joinRoom =() => {
    if (signupData.username !== "" && signupData.room !== "") {
      //to emit an event we use emit this is listened in the server
      socket.emit("join_room", signupData.room);
      setShowChat(true);
    }
  };

  return (
    <>
    {!showChat?(<div>
    <h3>Join A chat</h3>
    <input type="text" placeholder='Pratham' name='username' id='username' value={signupData.username} onChange={handleUserInput}></input>
    <input type="text" placeholder='Room Id' name='room' id='room' value={signupData.room} onChange={handleUserInput}></input>
    <button onClick={joinRoom}>Join a room</button></div>):(

    <Chat socket={socket} username={signupData.username} room={signupData.room}/>)

    }
    </>
  )
}

export default App
