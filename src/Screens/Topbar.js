import React from "react";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const nav = useNavigate();
  return (
    <div className="Topbar">
      <div>
        <img
          src="Icons/mobiflyicon.png"
          alt="Mobifly Icon"
          height="30px"
          width="78px"
        />
      </div>

      <div>
        <img
          src="Icons/adminicon.png"
          alt="admin"
          height="18px"
          width="18px"
        ></img>
        <p>Admin</p>
        <img
          src="Icons/logouticon.png"
          alt=""
          style={{ cursor: "pointer" }}
          onClick={() => {
            localStorage.removeItem("idToken");
            setTimeout(() => {
              nav("/login");
            }, 600);
          }}
        />
      </div>
    </div>
  );
}

export default Topbar;
