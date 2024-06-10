import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
