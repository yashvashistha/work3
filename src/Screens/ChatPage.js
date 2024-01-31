import React, { useEffect, useRef, useState } from "react";
import ReadChat from "./ReadChat";
import { Document, Page, pdfjs } from "react-pdf";

function ChatPage() {
  const fileinputref = useRef(null);
  const [file, setFile] = useState(null);

  const hiddenuploadhandler = async (e) => {
    // console.log(e.target.files[0]);
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
          height: "min(100px, 20%)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <ReadChat />
        <button
          style={{
            width: "max(120px, 5%)",
            height: "min(38px, 5%)",
            position: "absolute",
            top: "12%",
            right: "12ch",
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
  const [pdfFile, setPdfFile] = useState(null);
  const [filename, setFileName] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState();
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages);
    setNumPages(numPages);
  };

  useEffect(() => {
    if (data.pdf) {
      setPdfFile(data.pdf);
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
      <div style={{ flex: 1, border: "1px solid lightgrey" }}>
        <p>{filename}</p>
        <div>
          {pdfFile && (
            <Document
              file={pdfFile}
              onLoadSuccess={onDocumentLoadSuccess}
              style={{ overflow: "scroll" }}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <Page key={index + 1} pageNumber={index + 1} width={500} />
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
