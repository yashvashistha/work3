import React from "react";
// import "./Topbar.css";

function Topbar() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgba(247, 132, 22, 1)",
        borderBottom: "2px solid rgba(22, 120, 253, 1)",
        height: "46px",
      }}
    >
      <img
        src="Icons/mobiflyicon.png"
        alt="Mobifly Icon"
        height="30px"
        width="78px"
        style={{ position: "relative", left: "8px" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          position: "relative",
          right: "3ch",
        }}
      >
        <img
          src="Icons/adminicon.png"
          alt="admin"
          height="18px"
          width="18px"
        ></img>
        <p
          style={{
            width: "40px",
            height: "16px",
            color: "white",
            fontFamily: "arial",
            fontWeight: "400",
            fontSize: "14px",
            lineHeight: "16px",
          }}
        >
          Admin
        </p>
      </div>

      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "110px",
          justifyContent: "space-between",
          // alignContent: "center",
        }}
      >
        <div
          style={{
            flex: 2,
            display: "flex",
            flexDirection: "row",
            gap: "5px",
            alignSelf: "center",
          }}
        >
          <img
            src="Icons/adminicon.png"
            alt="admin"
            height="18px"
            width="18px"
          ></img>
          <p
            style={{
              width: "31px",
              height: "16px",
              color: "white",
              fontFamily: "arial",
              fontWeight: "400",
              fontSize: "14px",
              lineHeight: "16px",
            }}
          >
            John
          </p>
        </div>
        <div style={{ flex: 1 }}>
          <img
            src="Icons/logouticon.png"
            alt="Logout Icon"
            height="24px"
            width="24px"
          ></img>
        </div>
      </div> */}
    </div>

    // <div className="topbar">
    //   <div className="pdficon">
    //     <img
    //       src="Icons/mobiflyicon.png"
    //       alt="Mobifly Icon"
    //       height="30px"
    //       width="78px"
    //     ></img>
    //   </div>
    //   <div className="adminicon">
    //     <img src="Icons/adminicon.png" alt="admin"></img>
    //     <p
    //       style={{
    //         width: "32px",
    //         height: "16px",
    //         color: "white",
    //       }}
    //     >
    //       John
    //     </p>
    //     <img
    //       src="Icons/logouticon.png"
    //       style={{ width: "24px", height: "24px" }}
    //     ></img>
    //   </div>
    // </div>
  );
}

export default Topbar;
