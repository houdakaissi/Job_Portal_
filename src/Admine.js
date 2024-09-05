import React, { useState } from 'react';
 import './Admine.css';
import Sidebar from './Sidebar';
import Home_ from './Home_';
import Header from './Header';

function Admine() {
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

    const OpenSidebar = () => {
      setOpenSidebarToggle(!openSidebarToggle)
    }
    return(
        <div className="grid-container">
   <Home_ />
   <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
   <Header OpenSidebar={OpenSidebar} />
   </div>
    );
}

export default Admine;