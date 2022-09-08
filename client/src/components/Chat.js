import { useRef, useState } from "react";
import "../assets/styles/chat.css";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

const Chat = ({ socket, roomId }) => {
  const [messageBox, setMessageBox] = useState([]);
  const message = useRef("");
  console.log(
    messageBox.map((msg, index) => {
      if (msg !== undefined) {
        return <p key={index}>{msg}</p>;
      }
    })
  );

  const sendMessage = (e) => {
    if (message.current !== "") {
      const temp = [...messageBox, `You: ${message.current}`];
      setMessageBox(temp);
      socket.emit("send-msg", roomId, `Opponent: ${message.current}`);
    }
  };

  socket.on("msg-sent", (message) => {
    const temp = [...messageBox, message];
    console.log(message, temp);
    setMessageBox(temp);
  });

  return (
    <div className="chatbox-wrapper">
      <div className="chatbox">
        {messageBox.map((msg, index) => {
          if (msg !== undefined) {
            return <p key={index}>{msg}</p>;
          }
        })}
      </div>
      <input
        type="text"
        placeholder="Chat Here"
        autoFocus
        onChange={(e) => (message.current = e.target.value)}
      ></input>
      <Button variant="contained" endIcon={<SendIcon />} onClick={sendMessage}>
        Send
      </Button>
    </div>
  );
};

export default Chat;
