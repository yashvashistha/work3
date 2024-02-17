import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useNavigate, useParams } from "react-router-dom";
import { JSONEditor } from "react-json-editor-viewer";

const apilink =
  "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/";

function EditPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const [clicked, setClicked] = useState(false);
  const [dis, setDis] = useState("view");
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken") || "");
  // const reuploadapi =
  //   "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/reupload_json";

  const uploadjsonhandle = async (jsoncontent) => {
    setClicked(!clicked);
    const d = { uniqueid: id, data: jsoncontent.data.data.data };
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: apilink + id + "/json",
      headers: {
        Authorization: idToken,
        customerid: 123456,
        "Content-Type": "application/json",
        "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
      },
      data: JSON.stringify(d),
    };
    axios
      .request(config)
      .then((response) => {
        // nav("/");
        setDis("view");
        // alert("done");
      })
      .catch((error) => {
        console.log(error);
        alert("error");
      });
  };
  return (
    <div className="Chatpage">
      <Section2
        id={id}
        clicked={clicked}
        uploadjsonhandle={uploadjsonhandle}
        dis={dis}
        idToken={idToken}
      />
      <div
        style={{
          width: "min(1290px, 90%)",
          height: "min(38px, 40%)",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "3%",
          marginTop: "1%",
        }}
      >
        <button
          className="Upload-btn"
          style={{
            borderStyle: "none",
            height: "100%",
            display: dis == "view" ? "none" : "block",
          }}
          onClick={() => {
            setClicked(!clicked);
            setDis("view");
          }}
        >
          Save JSON
        </button>
        <button
          className="Upload-btn"
          style={{
            borderStyle: "none",
            height: "100%",
            display: dis == "edit" ? "none" : "block",
          }}
          onClick={() => {
            setDis("edit");
          }}
        >
          Edit JSON
        </button>
        <button
          className="Upload-btn"
          style={{ borderStyle: "none", height: "100%" }}
          onClick={() => {
            nav("/");
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function Section2({ id, clicked, uploadjsonhandle, dis, idToken }) {
  const styles = {
    dualView: {
      display: "flex",
    },
    jsonViewer: {
      width: "100%",
      fontSize: 12,
      fontFamily: "Lucida Console, monospace",
      lineHeight: 1.25,
      display: dis === "view" ? "block" : "none",
    },
    jsonEditor: {
      width: "100%",
      fontSize: 12,
      fontFamily: "Lucida Console, monospace",
      lineHeight: 1.25,
      display: dis === "edit" ? "block" : "none",
    },
    root: {
      fontSize: 12,
      fontFamily: "Lucida Console, monospace",
      lineHeight: 1.25,
      color: "#3E3D32",
    },
    label: {
      color: "#000080",
      marginTop: 3,
    },
    value: {
      width: "50%",
      marginLeft: 20,
      border: "1px solid grey",
    },
    row: {
      display: "flex",
    },
    input: {
      padding: 2,
      fontFamily: "Lucida Console, monospace",
      fontSize: 12,
      borderStyle: "none",
      backgroundColor: "white",
      color: "black",
      width: "200%",
    },
    select: {
      backgroundColor: "white",
      color: "	#800000",
      borderStyle: "none",
    },
    addButton: {
      display: "none",
    },
    removeButton: {
      display: "none",
    },
    text: {
      color: "black",
      fontSize: 12,
    },
    number: {
      color: "purple",
      fontSize: 12,
    },
    property: {
      color: "DeepPink",
      fontSize: 12,
    },
    collapseIcon: {
      cursor: "pointer",
      fontSize: 10,
      color: "#000435",
    },
  };
  const [pdfFile, setPdfFile] = useState(null);
  const [jsonFile, setJsonFile] = useState(null);
  const [numPages, setNumPages] = useState();
  const [newjsonFile, setNewJsonFile] = useState(null);
  const [reload, setReload] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const downloadhandler = async (data) => {
    const downloadlink = apilink + data.id + "/" + data.type;
    try {
      const response = await axios.get(downloadlink, {
        headers: {
          Authorization: idToken,
          customerid: 123456,
        },
      });

      let resultfile;
      if (data.type === "pdf") {
        resultfile = response.data;
        // const decodestring = atob(response.data.body);
        // const utf8decoder = new TextDecoder("utf-8");
        // resultfile = utf8decoder.decode(
        //   new Uint8Array(
        //     decodestring.split("").map((char) => char.charCodeAt(0))
        //   )
        // );
        const blob = new Blob([resultfile], {
          type: "application/" + data.type,
        });
        const pdfurl = URL.createObjectURL(blob);
        setPdfFile(pdfurl);
        setLoading1(true);
      } else if (data.type === "json") {
        setJsonFile(response);
        setNewJsonFile(response);
        setLoading2(true);
      }
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const onJsonChange = (key, value, parent, data) => {
    jsonFile.data.data.data = data;
    setNewJsonFile(jsonFile);
    setJsonFile(jsonFile);
  };

  useEffect(() => {
    if (id && !clicked && reload) {
      downloadhandler({ id: id, type: "pdf" });
      downloadhandler({ id: id, type: "json" });
      setReload(!reload);
    }
    if (clicked) {
      uploadjsonhandle(newjsonFile);
      setReload(!reload);
    }
  }, [id, clicked, reload]);

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
          justifyContent: "space-between",
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
            height: "5%",
          }}
        >
          <p
            style={{
              alignSelf: "flex-start",
              fontFamily: "arial",
              fontWeight: "600",
              height: "20px",
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            PDF File
          </p>
          <div
            style={{
              width: "15%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <button
              style={{ width: "30px" }}
              onClick={() => {
                setPdfWidth(pdfwidth + 20);
              }}
            >
              +{/* <img src="Icons/zoominicon.png" /> */}
            </button>
            <button
              style={{ width: "30px" }}
              onClick={() => {
                setPdfWidth(pdfwidth - 20);
              }}
            >
              -{/* <img src="Icons/zoomouticon.png" /> */}
            </button>
          </div>
        </div>
        <div
          style={{
            overflowY: "scroll",
            overflowX: "auto",
            height: "95%",
            width: "100%",
            border: "1px solid grey",
            boxSizing: "content-box",
          }}
        >
          {loading1 && pdfFile ? (
            <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from({ length: numPages }, (_, index) => (
                <Page key={index + 1} pageNumber={index + 1} width={pdfwidth} />
              ))}
            </Document>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          border: "1px solid lightgrey",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            height: "5%",
          }}
        >
          <p
            style={{
              alignSelf: "flex-start",
              fontFamily: "arial",
              fontWeight: "600",
              height: "100%",
              marginLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            JSON
          </p>
          <div
            style={{
              width: "90%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
        </div>

        <div
          style={{
            height: "95%",
            width: "100%",
            overflowY: "scroll",
            border: "1px solid grey",
            boxSizing: "content-box",
          }}
        >
          {loading2 && jsonFile ? (
            <JSONEditor
              collapsible
              data={jsonFile.data.data.data}
              onChange={onJsonChange}
              styles={styles}
              view="dual"
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPage;
