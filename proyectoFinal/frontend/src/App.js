import React from 'react'
import Drawer from './components/drawer/drawer';

import { BrowserRouter } from "react-router-dom"; 



function App() {
  return (
    <div>      
      <BrowserRouter>
      <Drawer />
      </BrowserRouter>
    </div>
    
  );
}

export default App;
