import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

import IsPrivate from "./components/IsPrivate";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminPage from "./pages/AdminPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage/>}></Route>
        <Route path="/contact" element={<ContactPage/>}></Route>
        <Route path="/admin" element={<AdminPage/>}></Route>
        {/* <Route path="/admin/create-project" element={<IsPrivate><CreateProjectPage/></IsPrivate>}></Route> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
