import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OTPScreen() {
  const nav = useNavigate();
  const { email } = useParams();
  const otpurl =
    "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/user";
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
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

  const handleKeyDown = (index, event) => {
    // Move focus to the previous input box on backspace if current input is empty
    if (event.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const enteredOTP = otp.join("");
    console.log("OTP entered:", enteredOTP);
    // Clear OTP input
    setOTP(["", "", "", "", "", ""]);
    // Handle further steps like verification

    const newdata = {
      Email: email,
      OTP: enteredOTP,
    };

    console.log(newdata);

    var config = {
      method: "put",
      maxBodyLength: Infinity,
      url: otpurl,
      headers: {
        "Content-Type": "application/json",
        Created_by: "admin",
      },
      data: JSON.stringify(newdata),
    };
    axios
      .request(config)
      .then((response) => {
        console.log(response);
        toast.success("OTP verification Successfull!", {
          progress: 0,
          progressStyle: { background: "rgba(229, 184, 185, 1)" },
        });
        nav("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="FullScreen"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(247, 132, 22, 1)",
      }}
    >
      <div className="Center-div">
        <p style={{ fontWeight: "bold" }}>
          Please enter the OTP received in your email.
        </p>
        <form
          onSubmit={handleSubmit}
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
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
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

export default OTPScreen;
