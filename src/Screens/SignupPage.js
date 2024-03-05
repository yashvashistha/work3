import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
  const nav = useNavigate();
  const signupurl =
    "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/user";
  const [signupdata, setSignupData] = useState({
    cname: "",
    eId: "",
    pswd: "",
    cpswd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signupdata.pswd !== signupdata.cpswd) {
      toast.warn("Password and Confirm Password doesn't match!", {
        progress: 0,
        progressStyle: { background: "rgba(229, 184, 185, 1)" },
      });
      return;
    }

    const newdata = {
      Email: signupdata.eId,
      Pwd: signupdata.pswd,
      Cname: signupdata.cname,
    };

    console.log(JSON.stringify(newdata));

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: signupurl,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "doVk3aPq1i8Y5UPpnw3OO4a610LK2yFrahOpYEo0",
        Created_by: "admin",
      },
      data: JSON.stringify(newdata),
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        toast.success("Enter OTP to verify!", {
          progress: 0,
          progressStyle: { background: "rgba(229, 184, 185, 1)" },
        });
        nav(`/verify/${signupdata.eId}`);
      })
      .catch((error) => {
        console.log(error);
      });

    // if (true) {
    //   toast.success("Enter OTP to verify!", {
    //     progress: 0,
    //     progressStyle: { background: "rgba(229, 184, 185, 1)" },
    //   });
    //   nav("/verify");
    // }
  };
  return (
    <div className="Login">
      <div className="Section-1">
        <div
          style={{
            width: "min(316px, 90%)",
            height: "min(174px, 90%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Helvetica",
            gap: "max(5%, 10px)",
          }}
        >
          <img
            width="60%"
            height="50%"
            src="/Icons/largemobiflyicon.png"
            alt="Mobifly Icon"
          />
          <p>Navigate PDF Parser</p>
          <p>Effective. Comprehensive. Flexible</p>
        </div>
      </div>
      <div className="Section-2">
        <div
          style={{
            maxWidth: "445px",
            width: "95%",
            maxHeight: "450px",
            height: "90%",
            backgroundColor: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              maxWidth: "383px",
              width: "95%",
              //   maxHeight: "277px",
              height: "90%",
              //   backgroundColor: "yellow",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                // width: "62px",
                height: "18px",
                width: "90%",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // Login Component
                  nav("/login");
                }}
              >
                <img
                  src="Icons/bxs_lock.png"
                  alt="lock icon"
                  // style={{ width: "17px", height: "17px" }}
                />
                <p style={{ fontSize: "16px", lineHeight: "14px" }}>Login</p>
              </div>
              <hr />
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // Signup Component
                  nav("/signup");
                }}
              >
                <p
                  style={{
                    position: "relative",
                    left: "10%",
                    fontSize: "16px",
                    lineHeight: "14px",
                  }}
                >
                  Signup
                </p>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                maxHeight: "452px",
                height: "90%",
                // backgroundColor: "lightblue",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <input
                type="companyname"
                placeholder="  Company Name"
                name="cname"
                value={signupdata.cname}
                onChange={handleInputChange}
                style={{
                  height: "50px",
                  border: "1px solid black",
                }}
              />
              <input
                type="email"
                placeholder="  Username"
                name="eId"
                value={signupdata.eId}
                onChange={handleInputChange}
                style={{
                  height: "50px",
                  border: "1px solid black",
                }}
              />
              <input
                type="text"
                placeholder="  Password"
                name="pswd"
                value={signupdata.pswd}
                onChange={handleInputChange}
                style={{
                  height: "50px",
                  border: "1px solid black",
                }}
              />
              <input
                type="text"
                placeholder="  Confirm Password"
                name="cpswd"
                value={signupdata.cpswd}
                onChange={handleInputChange}
                style={{
                  height: "50px",
                  border: "1px solid black",
                }}
              />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  height: "36px",
                }}
              >
                <button
                  style={{
                    width: "108px",
                    height: "36px",
                    // backgroundColor: "rgba(208, 74, 2, 1)",
                    backgroundColor: "rgba(247, 132, 22, 1)",
                    color: "white",
                    fontSize: "16px",
                    fontFamily: "Arial",
                    fontWeight: "700",
                    borderStyle: "none",
                    cursor: "pointer",
                  }}
                  onClick={handleSubmit}
                >
                  Signup
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: "16px",
                  width: "222px",
                  fontSize: "11px",
                  fontFamily: "Arial",
                  fontWeight: "400",
                  lineHeight: "12.65px",
                  // color: "rgba(208, 74, 2, 1)",
                  color: "rgba(247, 132, 22, 1)",
                }}
              >
                <p style={{ cursor: "default" }}>Cookie Information</p>
                <hr />
                <p style={{ cursor: "default" }}>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
