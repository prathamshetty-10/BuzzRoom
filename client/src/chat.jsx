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
    return <div className="h-[700px] w-[90%] lg:h-[70vh] lg:w-[60vw] bg-gray-300 rounded-3xl lg:p-[10px] mr-[20px] lg:mr-[0px]">
    <div className="h-[50px] font-bold text-2xl  border-b-2 border-black text-black lg:mx-[100px] px-[130px] py-[10px] lg:py-[0px] sm:px-[280px] lg:px-[300px]">
        <p>Live chat</p>
    </div>
    <div className=" h-[550px] lg:h-[48vh] overflow-y-scroll">
    <ScrollToBottom className="h-[550px] lg:h-[48vh]">
    {messageList.map((messageContent) => {
      return username === messageContent.author ?(
        <div
          className=" w-[300px] lg:w-[350px]  text-black my-[10px] mx-[20px] lg:mx-[50px]"
          id={username === messageContent.author ? "you" : "other"}
        >
          <div>
            <div className="message-content bg-[#576ce6] min-h-[30px] rounded-2xl px-[15px] py-[5px] break-normal">
              <p className=" w-full break-words">{messageContent.message}</p>
            </div>
            <div className="message-meta flex gap-4 px-[20px] ">
              <p id="time">{messageContent.time}</p>
              <p id="author">{messageContent.author}</p>
            </div>
          </div>
        </div>
      ):(
        <div
          className=" w-[300px] lg:w-[350px]  text-black my-[10px] ml-[60px] sm:ml-[350px] lg:ml-[510px]"
          id={username === messageContent.author ? "you" : "other"}
        >
          <div>
            <div className="message-content bg-[#40b085] min-h-[30px] rounded-2xl px-[15px] py-[5px] break-normal">
              <p className=" w-full break-words">{messageContent.message}</p>
            </div>
            <div className="message-meta flex gap-4 px-[20px] ">
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
        <input type="text" value={currMessage} placeholder="send a message" className="h-[50px] w-[60vw] lg:w-[40vw] ml-[20px] lg:ml-[70px] bg-transparent border-black text-black rounded-3xl border-2 px-[40px]" onChange={handle}/>
        <button onClick={sendMessage} className="w-[20vw] lg:w-[10vw] h-[50px] bg-yellow-500 text-black font-bold text-xl mx-[10px] md:mx-[30px] rounded-3xl border-2 border-black hover:bg-yellow-300">Send</button>
    
    
    </div>

}
export default Chat;