import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./sections/Home";
import AboutSection from "./sections/AboutSection";
import AboutPage from "./pages/AboutPage";
import Milestone from "./pages/Milestone";
import Visimisi from "./pages/Visimisi";
import ProductSection from "./sections/ProductSection";
import CommercialCar from "./pages/CommercialCar"
import PassengerCar from "./pages/PassengerCar";
import Parts from "./pages/Parts";
import MachiningSection from "./sections/MachiningSection"
import MachiningPage from "./pages/MachiningPage"
import AwardCertif from "./pages/AwardsCertif"
import ContactUs from "./pages/ContactUs";

const MainLayout = () => (
  <>
    <Navbar />
    <Home />
    <AboutSection />
    <ProductSection/>
    <MachiningSection/>

    <Footer />
  </>
);

const PageLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <div className="scroll-smooth">
        <Routes>
          <Route path="/" element={<MainLayout />} />
          <Route path="/companyprofile" element={<PageLayout><AboutPage /></PageLayout>} />
          <Route path="/milestone" element={<PageLayout><Milestone /></PageLayout>} />
          <Route path="/visimisi" element={<PageLayout><Visimisi /></PageLayout>} />
          <Route path="/commercialcar" element={<PageLayout><CommercialCar /></PageLayout>} />
          <Route path="/passengercar" element={<PageLayout><PassengerCar /></PageLayout>} />
          <Route path="/parts" element={<PageLayout><Parts /></PageLayout>} />
          <Route path="/machiningfacilities" element={<PageLayout><MachiningPage /></PageLayout>} />
          <Route path="/events" element={<PageLayout><AwardCertif /></PageLayout>} />
          <Route path="/contactus" element={<PageLayout><ContactUs /></PageLayout>} />


      
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;