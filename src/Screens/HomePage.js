import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import ReadChat1 from "./ReadChat1";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const apilink =
  "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/";

function HomePage() {
  const nav = useNavigate();
  const [reload, setReload] = useState(false);
  const [idToken, setIdToken] = useState(localStorage.getItem("idToken") || "");

  useEffect(() => {
    if (idToken === "") {
      nav("/login");
    }
  });
  return (
    <div className="Homepage">
      <div style={{ height: "min(100px, 20%)", width: "100%" }}>
        <ReadChat1 />
      </div>
      {/* <div style={{ height: "5%", width: "100%" }}></div> */}
      <Upload setReload={setReload} reload={reload} idToken={idToken} />
      <Tablecontainer setReload={setReload} reload={reload} idToken={idToken} />
    </div>
  );
}

function Upload({ setReload, reload, idToken }) {
  const [rotation, setRotation] = useState(0);
  const [selectedoption, setSelectedOption] = useState(null);
  const options = [
    { value: "BOE", label: "Bill Of Entry" },
    { value: "SB", label: "Shipping Bill" },
    { value: "CHKBOE", label: "Checklist Bill Of Entry" },
    { value: "ADV", label: "Advance License" },
    { value: "ADVNEW", label: "Advance License New" },
    { value: "AC", label: "Authorized Cetificate" },
    { value: "EPCG", label: "EPCG License" },
    { value: "EPCGNEW", label: "EPCG License New" },
    { value: "BRC", label: "Bank Realisation Certificate" },
    { value: "IT", label: "Income Tax" },
    { value: "GSTR1", label: "GSTR1" },
    { value: "GSTR1NEW", label: "GSTR1 New" },
    { value: "GSTR3B", label: "GSTR3B" },
    { value: "GSTR9", label: "GSTR9" },
    { value: "GSTR9C", label: "GSTR9c" },
    { value: "NOTICE", label: "Notice" },
    { value: "SI", label: "Sales Invoice" },
    { value: "CI", label: "Commercial Invoice" },
    { value: "DD", label: "Delivery Detail" },
    { value: "PI", label: "Purchase Invoice" },
  ];
  const customStyles = {
    // Example styles, you can customize them according to your needs
    control: (provided, state) => ({
      ...provided,
      border: "1px solid orange",
      boxShadow: state.isFocused ? "none" : "none",
      "&:hover": {
        border: "1px solid orange",
      },
    }),
    menu: (provided) => ({
      ...provided,
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      border: "1px solid #ccc", // Add a border to each option
      color: state.isSelected ? "orange" : "black", // Change text color when selected
      background: state.isFocused ? "#f0f0f0" : "white", // Change background color when focused
    }),
    indicatorSeparator: () => ({}), // Remove the default indicator separator
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transition: "transform 0.3s", // Add a transition for a smooth rotation effect
      transform: state.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)", // Rotate the arrow based on menu state
    }),
  };
  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.log("Selected Method:", selectedOption);
  };

  const fileinputref = useRef(null);
  // const posturl =
  //   "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/upload_pdf";
  const [file, setFile] = useState(null);
  const [block, setBlock] = useState("block");
  const pref = useRef(null);
  const uploadicon = "Icons/uploadicon.png";

  const rotateImage = () => {
    setRotation(rotation + 360);
  };

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
    pref.current.innerText = file.name;
    setBlock("none");
    setFile(file);
  };

  const uploadbtnhandle = async () => {
    if (file === null) {
      toast.warn("Upload a File!", {
        progress: 0,
        progressStyle: { background: "rgba(255, 222, 190, 1)" },
      });
      return;
    }
    if (file.type !== "application/pdf") {
      toast.warn("Only PDF Files are allowed!", {
        progress: 0,
        progressStyle: { background: "rgba(255, 222, 190, 1)" },
      });
      return;
    }
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      // url: posturl,
      url: apilink,
      headers: {
        Authorization: idToken,
        customerid: 123456,
        filetype: selectedoption.value,
      },
      data: file,
    };
    axios
      .request(config)
      .then((response) => {
        pref.current.innerText = "";
        setBlock("block");
        setReload(!reload);
        setSelectedOption(null);
        toast.success("PDF Uploaded Successfully!", {
          progress: 0,
          progressStyle: { background: "rgba(255, 222, 190, 1)" },
        });
      })
      .catch((error) => {
        toast.error(error, {
          progress: 0,
          progressStyle: { background: "rgba(255, 222, 190, 1)" },
        });
      });
  };
  return (
    <div className="Upload-Maindiv">
      <p>Upload File</p>
      <div className="Upload-Subdiv">
        <div style={{ width: "max(15%, 200px)", overflow: "visible" }}>
          <Select
            className="Upload-select"
            options={options}
            value={selectedoption}
            onChange={handleChange}
            placeholder={
              selectedoption == null ? "Select Method" : selectedoption.label
            }
            styles={customStyles}
          />
        </div>
        <div
          className="DragDrop"
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p ref={pref}></p>
          <p style={{ width: "100%", display: block }}>
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
        {/* Hidden file input from here */}
        <input
          type="file"
          ref={fileinputref}
          style={{ display: "none" }}
          onChange={hiddenuploadhandler}
        />
        {/* Hidden file input to here  */}

        <div className="Upload-btn" onClick={uploadbtnhandle}>
          <p style={{ margin: "0px" }}>Upload</p>
        </div>
        <div
          style={{
            width: "15%",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img
            src="Icons/refreshicon.png"
            alt="Refresh"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: "transform 2s ease",
              cursor: "pointer",
            }}
            onClick={() => {
              setReload(!reload);
              rotateImage();
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Tablecontainer({ setReload, reload, idToken }) {
  const nav = useNavigate();
  const deleteicon = "Icons/deleteicon.png";
  const pdficon = "Icons/pdficon.png";
  const jsonicon = "Icons/jsonicon.png";
  const editicon = "Icons/editicon.png";
  // const tableapi =
  //   "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/list_data";
  // const filedownloadapi =
  //   "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/download_data?";
  // const deletefileapi =
  //   "https://pyrtqap426.execute-api.ap-south-1.amazonaws.com/navigate-pdf-parser/delete_data?uniqueid=";
  const [tableinfo, setTableInfo] = useState(null);
  const [rowperpage] = useState(20);
  const [rowlen, setRowLen] = useState(1);
  const [currentpage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const deletehandler = async (id) => {
    // const deletelink = deletefileapi + id;
    const deletelink = apilink + id;
    try {
      const response = await axios.delete(deletelink, {
        headers: {
          Authorization: idToken,
          customerid: 123456,
          // "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
    setReload(!reload);
  };

  const downloadhandler = async (data) => {
    const downloadlink = apilink + data.id + "/" + data.type;
    // const downloadlink =
    //   filedownloadapi + "uniqueid=" + data.id + "&type=" + data.type;
    try {
      const response = await axios.get(downloadlink, {
        headers: {
          Authorization: idToken,
          customerid: 123456,
          // "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          // "Content-Type": "application/" + data.type,
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
      const response = await axios.get(apilink, {
        headers: {
          Authorization: idToken,
          customerid: 123456,
          "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          // "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
          // "Content-Type": "application/json",
        },
      });
      setRowLen(response.data.data.length);
      const sortedData = response.data.data
        .map((item) => ({
          ...item,
          Curr_date_time: new Date(item.Curr_date_time),
        }))
        .sort((a, b) => b.Curr_date_time - a.Curr_date_time);
      setTableInfo(sortedData);
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
    setLoading(false);
    setTimeout(() => {
      fetchdata();
      setLoading(true);
    }, 2000);
  }, [reload]);
  return (
    <div className="Table-Maindiv">
      <div className="Table-div">
        <table>
          <thead>
            <th style={{ flex: 2 }}>Upload ID</th>
            <th style={{ flex: 4 }}>File Name</th>
            <th style={{ flex: 1 }}>File Type</th>
            <th style={{ flex: 1, minWidth: "8ch" }}>Status</th>
            <th style={{ flex: 2 }}>Loaded At</th>
            <th style={{ flex: 2 }}>Action</th>
          </thead>
          <tbody>
            {loading && tableinfo ? (
              tableinfo.slice(indexoffirstrow, indexoflastrow).map((d) => (
                <tr>
                  <td>{d.UniqueId || "ID"}</td>
                  <td>{d.File_name || "NULL"}</td>
                  <td>{d.File_type || "--"}</td>
                  <td>{d.Status || "Status"}</td>
                  <td>
                    {(
                      <div>
                        <p>{d.Curr_date_time.toString().slice(0, 15)}</p>
                        <p>
                          {d.Curr_date_time.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })}
                        </p>
                      </div>
                    ) || "NULL"}
                  </td>
                  <td>
                    <div>
                      <button
                        title="Edit"
                        style={{
                          backgroundImage: `url(${editicon})`,
                        }}
                        onClick={() => {
                          nav(`/edit/${d.UniqueId}`);
                        }}
                      ></button>
                      <button
                        title="Delete"
                        style={{
                          backgroundImage: `url(${deleteicon})`,
                        }}
                        onClick={() => {
                          deletehandler(d.UniqueId);
                        }}
                      ></button>
                      <button
                        title="Download PDF"
                        style={{
                          backgroundImage: `url(${pdficon})`,
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
                          backgroundImage: `url(${jsonicon})`,
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
              ))
            ) : (
              <p>Loading...</p>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        postsPerPage={rowperpage}
        totalPosts={rowlen}
        currentpage={currentpage}
        indexoffirstrow={indexoffirstrow}
        indexoflastrow={indexoflastrow}
        paginate={paginate}
      />
    </div>
  );
}

export default HomePage;
