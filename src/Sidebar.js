import { Link } from 'react-router-dom';
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import { useNavigate } from 'react-router-dom';
 import React, { useEffect, useState } from 'react';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
function Sidebar({openSidebarToggle, OpenSidebar}) {
   
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const storedUsername = localStorage.getItem('username');
  const storedPassword = localStorage.getItem('password');
  useEffect(() => {
    // Retrieve stored values from localStorage
   

    if (storedUsername) {
      setUsername(storedUsername);
      console.log('ggggggggggggg',storedUsername);
    }

    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);
    const handleLogout = (e) => {
        e.preventDefault(); // Prevent the default anchor behavior
        localStorage.clear(); 
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        const storedUsername = localStorage.getItem('username');
        console.log('Stored Username after clear:', storedUsername);
        navigate('/admin'); // Redirect to the login page
      };
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
            <FontAwesomeIcon icon={faUserShield} className='icon_header' />  Admin Area
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
            <Link to="/dashboard">
                    <BsGrid1X2Fill className='icon'/> Dashboard
               </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/dashboard/Candidates">
                    <BsFillArchiveFill className='icon'/> Candidates list
             </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/dashboard/Companies">
                    <BsFillGrid3X3GapFill className='icon'/> Companies list
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/dashboard/Jobs">
                    <BsPeopleFill className='icon'/> Jobs list
                </Link>
            </li>
            <li className='sidebar-list-item'>
            <Link to="/dashboard/applications">
                    <BsListCheck className='icon'/> Applications list
                </Link>
            </li>
         
            <li className='sidebar-list-item'>
                <a   onClick={handleLogout}>
                    <BsFillGearFill className='icon' /> Logout
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar