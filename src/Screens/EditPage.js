import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";

function EditPage() {
  const { id } = useParams();
  const [clicked, setClicked] = useState(false);
  const reuploadapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/reupload_json";
  const uploadjsonhandle = async (jsoncontent) => {
    setClicked(!clicked);
    // jsoncontent = JSON.parse(jsoncontent);
    try {
      jsoncontent = JSON.parse(jsoncontent);
      const d = { uniqueid: id, data: jsoncontent.data };
      var config = {
        method: "post",
        maxBodyLength: Infinity,
        url: reuploadapi,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify(d),
      };
      axios
        .request(config)
        .then((response) => {
          console.log(response);
          alert("success");
        })
        .catch((error) => {
          console.log(error);
          alert("error");
        });
    } catch (error) {
      alert("Wrong JSON Format");
    }
  };
  return (
    <div className="Chatpage">
      <Section2 id={id} clicked={clicked} uploadjsonhandle={uploadjsonhandle} />
      <button
        className="Upload-btn"
        style={{ borderStyle: "none", marginTop: "1%" }}
        onClick={() => {
          setClicked(!clicked);
        }}
      >
        Save JSON
      </button>
    </div>
  );
}

function Section2({ id, clicked, uploadjsonhandle }) {
  const [pdfFile, setPdfFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [numPages, setNumPages] = useState();
  const [error, setError] = useState(false);
  const [newjsonFile, setNewJsonFile] = useState(null);
  const preref = useRef(null);
  const filedownloadapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/download_data?";
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    // console.log(numPages);
    setNumPages(numPages);
  };

  const downloadhandler = async (data) => {
    const downloadlink =
      filedownloadapi + "uniqueid=" + data.id + "&type=" + data.type;
    try {
      const response = await axios.get(downloadlink, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          "Content-Type": "application/" + data.type,
        },
      });

      let resultfile;
      if (data.type === "pdf") {
        const decodestring = atob(response.data.body);
        const utf8decoder = new TextDecoder("utf-8");
        resultfile = utf8decoder.decode(
          new Uint8Array(
            decodestring.split("").map((char) => char.charCodeAt(0))
          )
        );
        const blob = new Blob([resultfile], {
          type: "application/" + data.type,
        });
        const pdfurl = URL.createObjectURL(blob);
        setPdfFile(pdfurl);
      } else if (data.type === "json") {
        // console.log(typeof JSON.parse(response));
        resultfile = JSON.stringify(response.data.data, null, 2);
        setJsonFile(resultfile);
        setNewJsonFile(resultfile);
        // console.log(response.data.data);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const jsonchangehandle = () => {
    const jsoncontent = preref.current.innerHTML;
    try {
      JSON.parse(jsoncontent);
      return true;
      // const lines = jsoncontent.split("\n");
      // lines.forEach((line, index) => {
      //   lines[index] = `<span style="background-color: white;">${line}</span>`;
      // });
      // preref.current.innerHTML = lines.join("\n");
    } catch (e) {
      console.log(e.message);
      const lines = jsoncontent.split("\n");
      setError("Invalid JSON format");
      const mat = e.message.match(/\(line (\d+) column (\d+)\)/);
      alert(
        `Wrong format in ${lines[parseInt(mat[1] - 2)]} at line ${parseInt(
          mat[1] - 2
        )}`
      );
      return false;

      // lines.forEach((line, index) => {
      //   lines[index] = `<span style="background-color: white;">${line}</span>`;
      //   if (index === parseInt(mat[1] - 2)) {
      //     console.log(line);
      //     lines[
      //       index
      //     ] = `<span style="background-color: lightcoral;">${line}</span>`;
      //   }
      // });
      // Set the innerHTML of the div with the modified lines
      // preref.current.innerHTML = lines.join("\n");
    }
  };

  useEffect(() => {
    if (id && !clicked) {
      downloadhandler({ id: id, type: "pdf" });
      downloadhandler({ id: id, type: "json" });
    }
    if (clicked) {
      if (jsonchangehandle()) {
        uploadjsonhandle(preref.current.innerText);
      }
      // console.log(preref.current.innerText);
    }
  }, [id, clicked]);

  const [pdfwidth, setPdfWidth] = useState(620);
  return (
    <div
      style={{
        width: "min(1290px, 90%)",
        height: "min(737px, 85%)",
        border: "1px solid lightgrey",
        display: "flex",
        flexDirection: "row",
        marginTop: "2%",
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <p
            style={{
              alignSelf: "flex-start",
              fontFamily: "arial",
              fontWeight: "600",
              height: "20px",
            }}
          >
            PDF File
          </p>
          <div
            style={{
              width: "10%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{ width: "20px" }}
              onClick={() => {
                setPdfWidth(pdfwidth + 20);
              }}
            >
              +{/* <img src="Icons/zoominicon.png" /> */}
            </button>
            <button
              style={{ width: "20px" }}
              onClick={() => {
                setPdfWidth(pdfwidth - 20);
              }}
            >
              -{/* <img src="Icons/zoomouticon.png" /> */}
            </button>
          </div>
        </div>
        <div
          // ref={containerRef}
          style={{
            overflowY: "scroll",
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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            alignSelf: "flex-start",
            fontFamily: "arial",
            fontWeight: "600",
            height: "20px",
          }}
        >
          JSON
        </p>

        <div
          contentEditable={true}
          // onInput={jsonchangehandle}
          // onBlur={jsonchangehandle}
          style={{
            height: "95%",
            width: "100%",
            overflowY: "scroll",
          }}
        >
          {/* <JsonViewer data={JSON.parse(jsonFile)} ref={preref} /> */}
          {jsonFile && (
            <pre style={{ maxWidth: "100%", overflowX: "scroll" }} ref={preref}>
              {jsonFile}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}

// const JsonViewer = ({ data }) => {
//   const [expanded, setExpanded] = useState(false);
//   const divref = useRef(null);
//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const renderValue = (value) => {
//     if (typeof value === "object") {
//       return <JsonViewer data={value} />;
//     }
//     return value;
//   };

//   const renderObject = (obj) => {
//     return (
//       <ul>
//         {Object.entries(obj).map(([key, value]) => (
//           <li key={key}>
//             <strong>{key}:</strong> {renderValue(value)}
//           </li>
//         ))}
//       </ul>
//     );
//   };

//   // useEffect(() => {
//   //   console.log(divref.current.innerText);
//   // }, []);

//   return (
//     <div ref={divref}>
//       <button onClick={toggleExpand} style={{ width: "15px", height: "20px" }}>
//         {expanded ? "  -  " : "  +  "}
//       </button>
//       {expanded && typeof data === "object" && renderObject(data)}
//     </div>
//   );
// };

export default EditPage;
