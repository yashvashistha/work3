import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
    <div
      style={{
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: "2%",
        gap: "5%",
      }}
    >
      <Link
        to="/"
        style={{ width: "min(200px, 40%)", height: "min(90px, 90%)" }}
      >
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

      <Link
        to="/chat"
        style={{ width: "min(200px, 40%)", height: "min(90px, 90%)" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(247, 132, 22, 1)",
            display: "flex",
            justifyContent: "center",
          }}
          onClick={() => {
            setChat(!chat);
          }}
        >
          <img src="Icons/chaticon1.png" alt="Chat Icon" />
        </div>
      </Link>
    </div>
  );
}

export default ReadChat;
