import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import AddSwiftCode from './components/AddSwiftCode';
import Navbar from './components/Navbar';
import GetSwiftCode from "./components/GetSwiftCode";
import Start from "./components/Start";
import GetSwiftCodeByCountry from './components/GetSwiftCodeByCountry';

function App() {
  return (
  <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Start />} />
        <Route path="/" element={<Start />} />
        <Route path="/getSwiftCode" element={<GetSwiftCode />} />
        <Route path="/addSwiftCode" element={<AddSwiftCode />} />
        <Route path="/getSwiftCodeByCountry" element={<GetSwiftCodeByCountry />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
