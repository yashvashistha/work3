import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./ReadChat.css";

function ReadChat() {
  const [btnselect, setBtnSelect] = useState("read");
  const color1 = "rgba(247, 132, 22, 1)";
  const color2 = "rgba(238, 238, 238, 1)";
  const [rnum, setRNum] = useState("1");
  const [cnum, setCNum] = useState("2");
  const [rbcolor, setRBColor] = useState(color1);
  const [cbcolor, setCBColor] = useState(color2);
  const [read, setRead] = useState(true);
  const [chat, setChat] = useState(true);

  return (
    <div className="readchat">
      <Link className="linkbtn" to="/">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(247, 132, 22, 1)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="Icons/readicon1.png" alt="Read Icon" />
        </div>
      </Link>

      <Link className="linkbtn" to="/chat">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(247, 132, 22, 1)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src="Icons/chaticon1.png" alt="Chat Icon" />
        </div>
      </Link>
    </div>
  );
}

export default ReadChat;
