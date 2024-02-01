import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function ReadChat() {
  // const [btnselect, setBtnSelect] = useState("read");
  // const color1 = "rgba(247, 132, 22, 1)";
  // const color2 = "rgba(238, 238, 238, 1)";
  // const [rnum, setRNum] = useState("1");
  // const [cnum, setCNum] = useState("2");
  // const [rbcolor, setRBColor] = useState(color1);
  // const [cbcolor, setCBColor] = useState(color2);
  // const [read, setRead] = useState(true);
  // const [chat, setChat] = useState(true);
  const readicon1 = "Icons/readicon1.png";
  const chaticon1 = "Icons/chaticon1.png";

  return (
    <div className="readchat">
      <Link className="linkbtn" to="/">
        <div>
          <img src={readicon1} alt="Read Icon" />
        </div>
      </Link>

      <Link className="linkbtn" to="/chat">
        <div>
          <img src={chaticon1} alt="Chat Icon" />
        </div>
      </Link>
    </div>
  );
}

export default ReadChat;
