import React from 'react'
import "./app.css";
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar'
import Clientes from './pages/clientes/clientes';
import Home from './pages/home/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <BrowserRouter>

      <div className="App">
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/clientes" element={<Clientes />} />
            </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
