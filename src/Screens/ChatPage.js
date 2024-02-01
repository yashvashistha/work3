import React, { useEffect, useRef, useState } from "react";
import ReadChat from "./ReadChat";
import { Document, Page, pdfjs } from "react-pdf";

function ChatPage() {
  const fileinputref = useRef(null);
  const [file, setFile] = useState(null);
  const [tempfile, setTempFile] = useState(null);
  const [block, setBlock] = useState(false);
  const [pblock, setPBlock] = useState(false);
  const pref = useRef(null);
  const uploadicon = "Icons/uploadicon.png";

  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    uploadhandler(e.dataTransfer.files[0]);
  };
  const openinputhandler = () => {
    fileinputref.current.click();
  };
  const uploadhandler = (file) => {
    setTempFile(file);
    setPBlock("none");
    pref.current.innerText = file.name;
  };
  const hiddenuploadhandler = async (e) => {
    uploadhandler(e.target.files[0]);
  };
  const uploadbtnhandle = () => {
    if (tempfile === null) {
      alert("Upload a File");
      return;
    }
    if (tempfile.type !== "application/pdf") {
      alert("Only PDF Files are allowed");
      return;
    }
    pref.current.innerText = "";
    setBlock(!block);
    setFile(tempfile);
  };
  return (
    <div className="Chatpage">
      <div className="Section1">
        <ReadChat />
        <button
          onClick={() => {
            setBlock(!block);
            // fileinputref.current.click();
          }}
        >
          Add New File
        </button>
        {/* Hidden file input from here */}
        <div
          className="popup-container"
          style={{
            display: block ? "flex" : "none",
            flexDirection: "column",
            // justifyContent: "space-around",
            // alignItems: "center",
          }}
        >
          <div
            style={{
              height: "max(40px, 20%)",
              width: "100%",
              backgroundColor: "rgba(247, 132, 22, 1)",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "700",
                fontFamily: "Helvetica",
                paddingLeft: "5px",
              }}
            >
              Chat PDF
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <div
              className="DragDrop"
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{ width: "60%" }}
            >
              <p ref={pref}></p>
              <p style={{ width: "100%", display: pblock }}>
                <img
                  src={uploadicon}
                  style={{ position: "relative", top: "4px" }}
                />{" "}
                Drag & Drop files in this or{" "}
                <span
                  onClick={openinputhandler}
                  style={{
                    color: "rgba(247, 132, 22, 1)",
                    cursor: "pointer",
                  }}
                >
                  Browse File
                </span>
              </p>
            </div>
            <div className="Upload-btn" onClick={uploadbtnhandle}>
              <p style={{ margin: "0px" }}>Upload</p>
            </div>
          </div>
        </div>
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

function Section2({ pdf }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [filename, setFileName] = useState(null);
  const [numPages, setNumPages] = useState();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages);
    setNumPages(numPages);
  };

  useEffect(() => {
    if (pdf) {
      setPdfFile(pdf);
      setFileName(pdf.name);
    }
    // console.log(reload);
    console.log(pdf);
  }, [pdf]);
  return (
    <div
      style={{
        width: "min(1290px, 90%)",
        height: "min(737px, 80%)",
        border: "1px solid lightgrey",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          flex: 1,
          border: "1px solid lightgrey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontFamily: "arial",
            fontWeight: "500",
            height: "20px",
          }}
        >
          {filename ? (
            <p>File Name: {filename.slice(0, -4)}</p>
          ) : (
            <p>No File Uploaded</p>
          )}
        </p>
        <div style={{ overflowY: "auto", overflowX: "scroll", height: "95%" }}>
          {pdfFile && (
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: numPages }, (_, index) => (
                <Page key={index + 1} pageNumber={index + 1} />
              ))}
            </Document>
          )}
        </div>
      </div>
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
        <div style={{ display: "flex", margin: "2%", paddingLeft: "5%" }}>
          <textarea style={{ width: "80%" }} placeholder="Ask any question.." />
          <button
            style={{
              width: "50px",
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
