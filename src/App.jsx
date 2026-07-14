import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ScreenName from "./components/ScreenName/ScreenName";
import ScreeningHistory from "./components/ScreeningHistory/ScreeningHistory";
import MainDashboard from "./components/StatsDashboard/MainDashboard";
import Btachscreen from "./components/BatchScreen/Btachscreen";
// import { parseSanctionsText } from "./utils/ParseSanctionsText";
import { useEffect, useState } from "react";
import axios from "axios";
import Sanctionslist from "./components/SanctionsList/Sanctionslist";

function App() {
  

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f9ff",
        // overflow: "hidden"
      }}
    >
      <Routes>
        <Route element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="screenName" element={<ScreenName />} />
          <Route path="/sanctionsList" element={<Sanctionslist />} />
          <Route path="/screeningHistory" element={<ScreeningHistory />} />
          <Route path="/stats" element={<MainDashboard />} />
          <Route path="/batchScreen" element={<Btachscreen />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
