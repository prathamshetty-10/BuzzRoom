import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket,username,room}){
    const [currMessage,setCurrmessage]=useState("");
    const [messageList, setMessageList] = useState([]);
    function handle(e){
        const {value}=e.target;
        setCurrmessage(value);
    }
    

    const sendMessage=async ()=>{
        if(currMessage!==""){
           
            const messageData={
                room:room,
                author:username,
                message:currMessage,
                time:new Date(Date.now()).getHours()+":"+new Date(Date.now()).getMinutes(),
            }
            
            await socket.emit("send_message",messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrmessage("");
        }
        
        
    }
    useEffect(() => {
        socket.off("receive_message").on("receive_message", (data) => {//off on cus otherwise message is received twice
    
          setMessageList((list) => [...list, data]);
        });
      }, [socket]); //whenever there is change in socket the above function happens
    return <div className="h-[70vh] w-[60vw] bg-gray-300 rounded-3xl p-[10px]">
    <div className="h-[50px] font-bold text-2xl  border-b-2 border-black text-black mx-[100px] px-[300px]">
        <p>Live chat</p>
    </div>
    <div className=" h-[48vh] overflow-y-scroll">
    <ScrollToBottom className="message-container">
    {messageList.map((messageContent) => {
      return (
        <div
          className="h-auto w-[300px] bg-yellow-500"
          id={username === messageContent.author ? "you" : "other"}
        >
          <div>
            <div className="message-content">
              <p>{messageContent.message}</p>
            </div>
            <div className="message-meta">
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>
            </div>
          </div>
        </div>
      );
    })}
  </ScrollToBottom>
    
    </div>
    <div className="h-[40px]"></div>
        <input type="text" value={currMessage} placeholder="send a message" className="h-[50px] w-[40vw] ml-[70px] bg-transparent border-black text-black rounded-3xl border-2 px-[40px]" onChange={handle}/>
        <button onClick={sendMessage} className="w-[10vw] h-[50px] bg-yellow-500 text-black font-bold text-xl mx-[30px] rounded-3xl border-2 border-black hover:bg-yellow-300">Send</button>
    
    
    </div>

}
export default Chat;