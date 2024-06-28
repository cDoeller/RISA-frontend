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
import CreateProjectPage from "./pages/CreateProjectPage";
import CreateContributorPage from "./pages/CreateContributorPage";
import ContributorsPage from "./pages/ContributorsPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contributors" element={<ContributorsPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
        <Route
          path="/admin/create-project"
          element={
            <IsPrivate>
              <CreateProjectPage />
            </IsPrivate>
          }
        ></Route>
        <Route
          path="/admin/create-contributor"
          element={
            <IsPrivate>
              <CreateContributorPage />
            </IsPrivate>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
