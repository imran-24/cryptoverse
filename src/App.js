import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Cryptocurrencies from "./components/Cryptocurrencies";
import CryptoDetails from "./components/CryptoDetails";
import Exchanges from "./components/Exchanges";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Sidebar from "./components/Sidebar";


function App() {
  const [active, setActive] = useState('Home')
  return (
    <div className="h-screen max-w-screen relative overflow-hidden lg:flex ">
      <div className='hidden lg:block'>
        <Sidebar active={active} setActive={setActive}/>
      </div>
      <div className="lg:hidden">
        <Navbar active={active} setActive={setActive}/>
      </div>
      
      <div className="flex-1 h-full relative overflow-y-scroll ">
        <Routes>
              <Route path="/*" element={ <Homepage active={active} setActive={setActive}/> } />
              <Route path="/cryptocurrencies" element={ <Cryptocurrencies /> } />
              <Route path="/crypto/:coinId" element={ <CryptoDetails /> } />
              <Route path="/exchanges" element={ <Exchanges /> } />
              <Route path="/news" element={ <News /> } />
        </Routes>
        {/* <div className="w-full h-20  bg-gray-900/100 flex flex-col items-center justify-center text-white font-semibold text-sm">
          <p>Cryptoverse</p>
          <p>All rights reserved</p>
        </div> */}
      </div>

      
    
    </div>
  );
}

export default App;
