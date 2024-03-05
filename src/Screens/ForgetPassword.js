import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import APIs from "../Utils/APIfile";

function ForgetPassword() {
  const nav = useNavigate();
  const { email } = useParams();
  const otpurl =
    "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/confirmpassword";

  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const [passworddata, setPasswordData] = useState({
    pswd: "",
    cpswd: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passworddata, [name]: value });
  };

  // OTP Handle Functions
  const OTPhandleChange = (index, value) => {
    // Ensure only numbers are entered
    if (!/^\d*$/.test(value)) return;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);
    // Move focus to the next input box
    if (value !== "" && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const OTPhandleKeyDown = (index, event) => {
    // Move focus to the previous input box on backspace if current input is empty
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Submit Handle function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.join("") === "") {
      toast.error("Enter OTP!", {
        progress: 0,
        progressStyle: { background: "rgba(229, 184, 185, 1)" },
      });
      return;
    }
    if (passworddata.pswd !== passworddata.cpswd) {
      toast.error("Password and Confirm Password does not Match!", {
        progress: 0,
        progressStyle: { background: "rgba(229, 184, 185, 1)" },
      });
      return;
    }

    const APIdata = JSON.stringify({
      Email: email,
      OTP: otp.join(""),
      Pwd: passworddata.pswd,
    });
    // console.log(APIdata);
    const ConfirmPasswordapi = APIs.ConfirmPasswordAPI;
    var config = {
      method: ConfirmPasswordapi.method,
      maxBodyLength: Infinity,
      url: ConfirmPasswordapi.url,
      headers: ConfirmPasswordapi.headers,
      data: APIdata,
    };
    axios
      .request(config)
      .then((response) => {
        toast.success("OTP verification Successfull!", {
          progress: 0,
          progressStyle: { background: "rgba(229, 184, 185, 1)" },
        });
        nav("/login");
      })
      .catch((error) => {
        toast.error("Please Submit Again!", {
          progress: 0,
          progressStyle: { background: "rgba(229, 184, 185, 1)" },
        });
      });
  };

  return (
    <div
      className="FullScreen"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(247, 132, 22, 1)",
      }}
    >
      <div className="Center-div">
        <h3>Set New Password</h3>
        <form
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "70%",
            gap: "5%",
          }}
        >
          {otp.map((value, index) => (
            <input
              name={index}
              className="tempinput"
              key={index}
              type="text"
              maxLength="1"
              value={value}
              onChange={(e) => OTPhandleChange(index, e.target.value)}
              onKeyDown={(e) => OTPhandleKeyDown(index, e)}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={{
                border: "1px solid black",
                height: "50px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: "bolder",
              }}
            />
          ))}
        </form>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <input
            type="text"
            placeholder="  New Password"
            name="pswd"
            value={passworddata.pswd}
            onChange={handleInputChange}
            style={{
              height: "50px",
              border: "1px solid black",
            }}
          />
          <input
            type="text"
            placeholder="  Confirm New Password"
            name="cpswd"
            value={passworddata.cpswd}
            onChange={handleInputChange}
            style={{
              height: "50px",
              border: "1px solid black",
            }}
          />
        </div>
        <button
          style={{
            width: "108px",
            height: "36px",
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
          Submit
        </button>
      </div>
    </div>
  );
}

export default ForgetPassword;
