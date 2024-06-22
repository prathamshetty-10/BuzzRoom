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
    return <div>
    <div className="chat-header">
        <p>Live chat</p>
    </div>
    <div className="chat-body">
    <ScrollToBottom className="message-container">
    {messageList.map((messageContent) => {
      return (
        <div
          className="message"
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
    <div className="chat-footer"></div>
        <input type="text" value={currMessage} placeholder="send a message" onChange={handle}/>
        <button onClick={sendMessage}>&#9658;</button>
    
    
    </div>

}
export default Chat;