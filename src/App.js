import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Topbar from "./Screens/Topbar";
import HomePage from "./Screens/HomePage";
import ChatPage from "./Screens/ChatPage";
import "./App.css";
import EditPage from "./Screens/EditPage";
import TempPage from "./Screens/TempPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="ScreenContainer">
          <Topbar />
          <Routes>
            {/* <Route path="/" exact element={<TempPage />} /> */}
            <Route path="/" exact element={<HomePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
