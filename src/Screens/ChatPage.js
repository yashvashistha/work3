import React, { useEffect, useRef, useState } from "react";
import ReadChat from "./ReadChat";

function ChatPage() {
  const fileinputref = useRef(null);
  const [file, setFile] = useState(null);

  const hiddenuploadhandler = async (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        // gap: "2.5%",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "min(125px, 25%)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ReadChat />
        <button
          style={{
            width: "min(153px, 10%)",
            height: "min(38px, 5%)",
            position: "absolute",
            top: "10%",
            right: "15%",
            // backgroundColor: "rgba(22, 120, 253, 1)",
            backgroundColor: "rgba(247, 131, 22)",
            borderStyle: "none",
            color: "white",
          }}
          onClick={() => {
            fileinputref.current.click();
          }}
        >
          Add New File
        </button>
        {/* Hidden file input from here */}
        <input
          type="file"
          ref={fileinputref}
          style={{ display: "none" }}
          onChange={hiddenuploadhandler}
        />
        {/* Hidden file input to here  */}
      </div>
      <Section2 pdf={file} />
    </div>
  );
}

function Section2(data) {
  const [filename, setFileName] = useState("PDF Viewer");
  useEffect(() => {
    if (data.pdf) {
      console.log(data.pdf.name);
      setFileName(data.pdf.name);
    }
  }, data.file);
  return (
    <div
      style={{
        width: "min(1290px, 90%)",
        height: "min(737px, 75%)",
        border: "1px solid lightgrey",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ flex: 1, border: "1px solid lightgrey" }}>{filename}</div>
      <div
        style={{
          flex: 1,
          border: "1px solid lightgrey",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <p>Chat</p>
        <div style={{ display: "flex", margin: "2%" }}>
          <textarea style={{ flex: 7 }} placeholder="Ask any question.." />
          <button
            style={{
              flex: 1,
              borderRadius: "0px 15px 15px 0px",
              borderStyle: "none",
              background: "rgba(247, 131, 22)",
              color: "white",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
