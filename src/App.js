import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./Screens/Topbar";
import HomePage from "./Screens/HomePage";
import "./App.css";
import ChatPage from "./Screens/ChatPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="ScreenContainer">
          <Topbar />
          <Routes>
            <Route path="/" exact element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
