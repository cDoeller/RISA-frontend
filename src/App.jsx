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
import UpdateContributorPage from "./pages/UpdateContributorPage";
import UpdateProjectPage from "./pages/UpdateProjectPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import CreateNewsPage from "./pages/CreateNewsPage";
import UpdateNewsPage from "./pages/UpdateNewsPage";
import NewsPage from "./pages/NewsPage";

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
        <Route path="/projects/:id" element={<ProjectDetailsPage />}></Route>
        <Route path="/news" element={<NewsPage />}></Route>

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
        <Route
          path="/admin/update-contributor/:id"
          element={
            <IsPrivate>
              <UpdateContributorPage />
            </IsPrivate>
          }
        ></Route>
        <Route
          path="/admin/update-project/:id"
          element={
            <IsPrivate>
              <UpdateProjectPage />
            </IsPrivate>
          }
        ></Route>
        <Route
          path="/admin/create-news"
          element={
            <IsPrivate>
              <CreateNewsPage />
            </IsPrivate>
          }
        ></Route>
        <Route
          path="/admin/update-news/:id"
          element={
            <IsPrivate>
              <UpdateNewsPage />
            </IsPrivate>
          }
        ></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
