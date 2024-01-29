import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="Sidebar">
      <div
        style={{
          width: "25px",
          height: "14px",
          position: "relative",
          top: "13.37px",
          left: "15px",
        }}
      >
        <p>V1.0</p>
      </div>
      <div className="BtnContainer">
        <div
          style={{
            width: "55px",
            height: "inherit",
            backgroundColor: "white",
            borderStyle: "none",
          }}
        >
          <button
            style={{
              width: "24px",
              height: "24px",
              position: "relative",
              left: "15px",
              backgroundImage: "url(Icons/menu-burger.png)",
              borderStyle: "none",
              backgroundColor: "white",
            }}
          ></button>
        </div>
        <div className="ScreenBtnContainer">
          <Link
            to="/chat"
            style={{ flex: 1, textDecoration: "none", display: "contents" }}
          >
            <button
              className="Sidebarbtn"
              style={{
                backgroundImage: "url(Icons/comment.png)",
              }}
            ></button>
          </Link>
          <Link
            to="/"
            style={{ flex: 1, textDecoration: "none", display: "contents" }}
          >
            <button
              className="Sidebarbtn"
              style={{
                backgroundImage: "url(Icons/upload.png)",
              }}
            ></button>
          </Link>
          <Link
            to="/topbar2"
            style={{ flex: 1, textDecoration: "none", display: "contents" }}
          >
            <button
              className="Sidebarbtn"
              style={{
                backgroundImage: "url(Icons/show.png)",
              }}
            ></button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
