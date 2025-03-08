import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import IssueCertificate from "./pages/IssueCertificate";
import Verify from "./pages/Verify";
import MyCertificates from "./pages/MyCertificates";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<IssueCertificate />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/certificates" element={<MyCertificates />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
