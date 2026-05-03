import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import GoogleAuto from "./components/pages/GoogleAuto";
import MatrixBg from "./components/Matrix";

function App() {
  const [] = useState(0);

  return (
    <>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none"}}>
        <MatrixBg />
      </div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route path="/google-auto" element={<GoogleAuto />} />
      </Routes>
    </>
  );
}

export default App;
