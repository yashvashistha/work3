const APIs = {
  // Get Password API (Get OTP to email)
  ForgetPasswordAPI: {
    url: "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/forgetpassword",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": " jUlXbxDSESrSJwI3Movt6VYIXfCAEAf1ozsltuWf",
    },
  },
  // Set New Password API (Type OTP and new Password)
  ConfirmPasswordAPI: {
    url: "https://muqo5wd6l2.execute-api.ap-south-1.amazonaws.com/dev/api/v1/files/confirmpassword",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "jUlXbxDSESrSJwI3Movt6VYIXfCAEAf1ozsltuWf",
    },
  },
  // Login/Signin API
  LoginAPI: {
    url: "https://api.qa.einvoice.aw.navigatetax.pwc.co.in/qa/auth/signin",
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "jUlXbxDSESrSJwI3Movt6VYIXfCAEAf1ozsltuWf",
    },
  },
};

export default APIs;
