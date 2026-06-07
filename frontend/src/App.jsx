import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./sections/Home";
import AboutSection from "./sections/AboutSection";
import AboutPage from "./pages/AboutPage"
import Milestone from "./pages/Milestone";


const MainLayout = () => (
  <>
    <Navbar />
    <Home />
    <AboutSection />
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="scroll-smooth">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="/milestone" element={<Milestone />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;