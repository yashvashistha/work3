import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ReadChat1() {
  const location = useLocation();
  const { pathname } = location;
  const nav = useNavigate();

  return (
    <div className="readchat">
      <button
        className="linkbtn"
        style={{
          width: "min(120px, 40%)",
          height: "min(60px, 90%)",
          borderStyle: "none",
          backgroundColor: "rgba(247, 132, 22, 1)",
        }}
        onClick={() => {
          nav("/");
        }}
      >
        <img
          src="Icons/readicon1.png"
          alt="Read Icon"
          style={{ width: "40%", height: "100%" }}
        />
      </button>
      <button
        className="linkbtn"
        style={{
          width: "min(120px, 40%)",
          height: "min(60px, 90%)",
          borderStyle: "none",
          backgroundColor: "rgba(238, 238, 238, 1)",
        }}
        onClick={() => {
          nav("/chat");
        }}
      >
        <img
          src="Icons/chaticon2.png"
          alt="Chat Icon"
          style={{ width: "40%", height: "100%" }}
        />
      </button>
    </div>
  );
}

export default ReadChat1;
