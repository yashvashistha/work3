import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import ReadChat2 from "./ReadChat2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.warn("Upload a File!", {
        progress: 0,
        progressStyle: { background: "rgba(217, 57, 84, 1)" },
      });
      return;
    }
    if (tempfile.type !== "application/pdf") {
      toast.warn("Only PDF Files are allowed!", {
        progress: 0,
        progressStyle: { background: "rgba(217, 57, 84, 1)" },
      });
      return;
    }
    pref.current.innerText = "";
    setBlock(!block);
    setFile(tempfile);
    setPBlock(!pblock);
    toast.success("PDF Uploaded Successfully!", {
      progress: 0,
      progressStyle: { background: "rgba(217, 57, 84, 1)" },
    });
  };
  return (
    <div className="Chatpage">
      <div className="Section1">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ReadChat2 />
          <button
            className="addnewbtn"
            onClick={() => {
              setBlock(!block);
            }}
          >
            Add New File
          </button>
        </div>
        {/* Hidden file input from here */}
        <div
          className="popup-container"
          style={{
            display: block ? "flex" : "none",
            flexDirection: "column",
            zIndex: "2",
          }}
        >
          <div
            style={{
              height: "max(40px, 20%)",
              width: "100%",
              backgroundColor: "rgba(247, 132, 22, 1)",
              display: "flex",
              justifyContent: "space-between",
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
            <button
              style={{
                borderStyle: "none",
                backgroundColor: "transparent",
                position: "relative",
                right: "10px",
                color: "white",
                fontSize: "15px",
                fontWeight: "500",
                cursor: "pointer",
              }}
              onClick={() => {
                setBlock(!block);
              }}
            >
              X
            </button>
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
  const [pdfwidth, setPdfWidth] = useState(620);
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
    // console.log(pdf);
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
          // overflow: "scroll",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
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
          <div
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: "10px",
            }}
          >
            <button
              style={{
                backgroundColor: "transparent",
                borderStyle: "none",
              }}
              onClick={() => {
                setPdfWidth(pdfwidth + 30);
              }}
            >
              <img
                src="Icons/zoominicon.png"
                width="80%"
                style={{ minWidth: "18px" }}
              />
            </button>
            <button
              style={{
                backgroundColor: "transparent",
                borderStyle: "none",
              }}
              onClick={() => {
                setPdfWidth(pdfwidth - 30);
              }}
            >
              <img src="Icons/zoomouticon.png" width="80%" />
            </button>
          </div>
        </div>
        <div
          style={{
            overflowY: "auto",
            overflowX: "auto",
            height: "95%",
            width: "100%",
          }}
        >
          {pdfFile && (
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: numPages }, (_, index) => (
                <Page key={index + 1} pageNumber={index + 1} width={pdfwidth} />
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
          alignItems: "center",
        }}
      >
        <p style={{ alignSelf: "flex-start" }}>Chat</p>
        <div
          style={{
            width: "80%",
            display: "flex",
            position: "relative",
            bottom: "10px",
            height: "25px",
          }}
        >
          <input
            style={{
              width: "90%",
              height: "25px",
              boxSizing: "border-box",
              border: "1px solid rgba(247, 132, 22, 1)",
            }}
            placeholder="Ask any question..."
          />
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
