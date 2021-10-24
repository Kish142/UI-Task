import React, { useContext } from 'react';

import { FaChartPie } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';

import { UserContext } from '../../../context/userLoggedIn';

import './Sidebar.style.scss';

const Sidebar = ({ toggleMenu, closeMenu }) => {
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('user');
    setIsUserLoggedIn(false);
  };
  return (
    <div className='sidebar'>
      {toggleMenu && <div onClick={closeMenu} className='bg-overlay'></div>}
      <div
        style={{ display: toggleMenu ? 'block' : 'none' }}
        className='sidebar-wrapper'
      >
        <div className='header flex flex-ai-c flex-jc-sb'>
          <p className='heading'>Main Menu</p>
          <div onClick={closeMenu} className='close-icon flex flex-ai-c'>
            <GrFormClose />
          </div>
        </div>
        <div className='menu-items'>
          <div className='dashboard'>
            <div className='main-menu flex flex-ai-c'>
              <div className='icon flex flex-ai-c'>
                <FaChartPie />
              </div>
              <Link to='/'>
                <p onClick={closeMenu}>Dashboard</p>
              </Link>
            </div>
            <div className='sub-menu'>
              <Link to='/user'>
                <p onClick={closeMenu} className='menu-item'>
                  User List
                </p>
              </Link>
            </div>
          </div>
          <div className='profile-menu profile flex flex-ai-c'>
            <div className='icon flex flex-ai-c'>
              <FaUserCircle />
            </div>
            <Link to='/profile'>
              <p onClick={closeMenu}>Profile</p>
            </Link>
          </div>
          <div onClick={logout} className='logout flex flex-ai-c'>
            <p>Logout</p>
            <div className='icon flex flex-ai-c flex-jc-c'>
              <FiLogOut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
