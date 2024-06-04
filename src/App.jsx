import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
      </Routes>
    </>
  );
}

export default App;
