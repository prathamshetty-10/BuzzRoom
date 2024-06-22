import { useState } from 'react'
import Chat from './chat.jsx'
import './App.css'
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
    <div className='bg-[url("./assets/bg.avif")] bg-cover min-h-[100vh] border-black flex items-center justify-center'>
    {!showChat?(<div className='h-[40vh] sm:h-[50vh]  bg-transparent w-[320px] lg:w-[25vw] rounded-3xl shadow-[0_0_10px_gray] lg:p-[30px]'>
    <h3 className='text-yellow-400 text-2xl sm:text-2xl lg:text-3xl px-[80px] lg:px-[50px] font-bold mb-[20px] lg:mb-[40px] mt-[20px] lg:mt-[0px] '>Join a Room!!</h3>
    <input type="text" placeholder='Enter Your Name'  className="h-[60px] lg:h-[50px] rounded-3xl w-[90%] lg:w-[20vw] bg-transparent shadow-[0_0_10px_gray] hover:shadow-[0_0_10px_yellow] px-[20px] font-bold mt-[20px] mx-[15px] lg:mx-[0px]" name='username' id='username' value={signupData.username} onChange={handleUserInput} ></input>
    <input type="text" className="h-[60px] lg:h-[50px] rounded-3xl w-[90%] lg:w-[20vw] bg-transparent shadow-[0_0_10px_gray] hover:shadow-[0_0_10px_yellow] px-[20px] font-bold my-[35px] mx-[15px] lg:mx-[0px]" placeholder='Enter Room Id' name='room' id='room' value={signupData.room} onChange={handleUserInput}></input>
    <button onClick={joinRoom} className='w-[200px] md:w-[15vw] bg-yellow-500 hover:bg-yellow-300 hover:shadow-[0_0_10px_gray] h-[60px] lg:h-[40px] rounded-3xl mx-[60px] lg:mx-[40px] font-bold text-black text-xl'>Join Room</button></div>):(

    <Chat socket={socket} username={signupData.username} room={signupData.room} />)

    }
    </div>
  )
}

export default App
