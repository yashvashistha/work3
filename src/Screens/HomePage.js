import React, { useEffect, useRef, useState } from "react";
import "../App.css";
// import "./Table.css";
import axios from "axios";
import Pagination from "./Pagination";
import "./Temptable.css";
import ReadChat from "./ReadChat";

function HomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        gap: "2.5%",
      }}
    >
      <div style={{ height: "min(125px, 25%)", width: "100%" }}>
        <ReadChat />
      </div>
      <Upload />
      <Tablecontainer />
    </div>
  );
}

function Upload() {
  const fileinputref = useRef(null);
  const ddref = useRef(null);
  const innerhtml1 =
    '<p>Click to upload</p><p>Drag and Drop to upload</p><input type="file" style="display: none;">';
  const innerhtml2 = "<p></p>";
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
  const hiddenuploadhandler = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    uploadhandler(selectedFile);
  };
  const uploadhandler = (file) => {
    console.log(file);
    ddref.current.innerHTML = innerhtml2;
    ddref.current.innerText = file.name;
  };
  return (
    <div
      style={{
        height: "min(124px, 25%)",
        width: "min(1500px, 96%)",
        // border: "1px solid red",
        borderBottom: "1px solid black",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p
        style={{
          // border: "1px solid black",
          height: "max(16px, 20%)",
          margin: "0",
          fontFamily: "Helvetica",
          fontWeight: "700",
          fontSize: "14px",
          lineHeight: "16px",
        }}
      >
        Upload File
      </p>
      <div
        style={{
          // border: "1px solid black",
          height: "80%",
          display: "flex",
          alignItems: "center",
          gap: "5%",
        }}
      >
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            display: "flex",
            flexDirection: "row",
            width: "40%",
            height: "70%",
            border: "1px dashed rgba(247, 132, 22, 1)",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
          ref={ddref}
        >
          <p style={{ width: "100%" }}>
            <img src="Icons/uploadicon.png" /> Drag & Drop files in this or{" "}
            <span
              onClick={openinputhandler}
              style={{ color: "rgba(247, 132, 22, 1)", cursor: "pointer" }}
            >
              Browse File
            </span>
          </p>
          {/* Hidden file input from here */}
          <input
            type="file"
            ref={fileinputref}
            style={{ display: "none" }}
            onChange={hiddenuploadhandler}
          />
          {/* Hidden file input to here  */}
        </div>
        <div
          style={{
            width: "min(153px, 30%)",
            height: "min(38px, 40%)",
            backgroundColor: "rgba(247, 132, 22, 1)",
            textAlign: "center",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "0px" }}>Upload</p>
        </div>
      </div>
    </div>
  );
}

function Tablecontainer() {
  const actionicon = "Icons/table-action.png";
  const deleteicon = "Icons/trash.png";
  const tableapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/list_data";
  const filedownloadapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/download_data?";
  const deletefileapi =
    "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/delete_data?uniqueid=";
  const [tableinfo, setTableInfo] = useState(null);
  const [reload, setReload] = useState(0);
  const [rowperpage] = useState(20);
  const [rowlen, setRowLen] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);

  const deletehandler = async (id) => {
    const deletelink = deletefileapi + id;
    try {
      const response = await axios.delete(deletelink, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
        },
      });
      console.log(response);
      setReload(reload + 1);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // "591ac92f-8b19-4331-a0a9-7ff94b059d6d" +

  const downloadhandler = async (data) => {
    const downloadlink =
      filedownloadapi +
      "uniqueid=" +
      "591ac92f-8b19-4331-a0a9-7ff94b059d6d" +
      "&type=" +
      data.type;
    try {
      const response = await axios.get(downloadlink, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          "Content-Type": "application/" + data.type,
        },
      });

      console.log(response);

      let resultfile;
      if (data.type === "pdf") {
        const decodestring = atob(response.data.body);
        const utf8decoder = new TextDecoder("utf-8");
        resultfile = utf8decoder.decode(
          new Uint8Array(
            decodestring.split("").map((char) => char.charCodeAt(0))
          )
        );
      } else if (data.type === "json") {
        resultfile = JSON.stringify(response, null, 2);
      }
      const blob = new Blob([resultfile], { type: "application/" + data.type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.id + "." + data.type;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const fetchdata = async () => {
    try {
      const response = await axios.get(tableapi, {
        headers: {
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          "Content-Type": "application/json",
        },
      });
      setTableInfo(response.data.data);
      setRowLen(response.data.data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const indexoflastrow = currentpage * rowperpage;
  const indexoffirstrow = indexoflastrow - rowperpage;
  const paginate = (pageNumber) => {
    console.log(indexoffirstrow, indexoflastrow);
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    fetchdata();
  }, [reload]);
  return (
    <div
      style={{
        height: "max(310px, 50%)",
        width: "min(1500px, 96%)",
        // border: "1px solid black",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        gap: "1%",
      }}
    >
      <div
        style={{
          // overflow: "scroll",
          overflowX: "auto",
          overflowY: "scroll",
          width: "100%",
          height: "100%",
          alignItems: "center",
        }}
      >
        <table
          style={{
            width: "98%",
            marginLeft: "1%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              color: "white",
              display: "flex",
              backgroundColor: "rgba(247, 132, 22, 1)",
            }}
          >
            <th style={{ flex: 2 }}>Upload ID</th>
            <th style={{ flex: 4 }}>File Name</th>
            <th style={{ flex: 1 }}>File Type</th>
            <th style={{ flex: 1 }}>Status</th>
            <th style={{ flex: 2 }}>Loaded At</th>
            <th style={{ flex: 2 }}>Action</th>
          </thead>
          <tbody>
            {tableinfo &&
              tableinfo.slice(indexoffirstrow, indexoflastrow).map((d) => (
                <tr style={{ display: "flex" }}>
                  <td style={{ flex: 2, textAlign: "center" }}>
                    {d.UniqueId || "ID"}
                  </td>
                  <td style={{ flex: 4, textAlign: "center" }}>
                    {d.File_name || "NULL"}
                  </td>
                  <td
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {d.File_type || "--"}
                  </td>
                  <td
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {d.Status || "Status"}
                  </td>
                  <td style={{ flex: 2, textAlign: "center" }}>
                    {(
                      <div>
                        <p>{`${d.Curr_date_time.split("T")[1].slice(0, 8)}`}</p>
                        <p>{`${d.Curr_date_time.split("T")[0]}`}</p>{" "}
                      </div>
                    ) || "NULL"}
                  </td>
                  <td style={{ flex: 2, display: "flex" }}>
                    <div
                      style={{
                        alignSelf: "center",
                        display: "flex",
                        // justifyContent: "space-evenly",
                        justifyContent: "center",
                        width: "100%",
                        gap: "15px",
                      }}
                    >
                      <button
                        title="Delete"
                        style={{
                          position: "relative",
                          width: "17px",
                          height: "18px",
                          backgroundImage: " url(Icons/deleteicon.png)",
                          borderStyle: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          deletehandler(d.UniqueId);
                        }}
                      ></button>
                      <button
                        title="Download PDF"
                        style={{
                          position: "relative",
                          width: "17px",
                          height: "18px",
                          backgroundImage: " url(Icons/pdficon.png)",
                          borderStyle: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          downloadhandler({
                            id: d.UniqueId,
                            type: "pdf",
                          });
                        }}
                      ></button>
                      <button
                        title="Download JSON File"
                        style={{
                          position: "relative",
                          width: "19px",
                          height: "20px",
                          backgroundImage: " url(Icons/jsonicon.png)",
                          borderStyle: "none",
                          backgroundColor: "transparent",
                        }}
                        onClick={() => {
                          downloadhandler({
                            id: d.UniqueId,
                            type: "json",
                          });
                        }}
                      ></button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination
        postsPerPage={rowperpage}
        totalPosts={rowlen}
        currentpage={currentpage}
        paginate={paginate}
      />
    </div>
  );
}

export default HomePage;
