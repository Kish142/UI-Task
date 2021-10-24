import React, { useEffect, useState } from 'react';

import { HiMenuAlt1 } from 'react-icons/hi';
import { BiSearchAlt } from 'react-icons/bi';

import './Header.style.scss';
import { Link } from 'react-router-dom';

const Header = ({ toggleMenuAction }) => {
  const [userName, setuserName] = useState();

  useEffect(() => {
    const ls = localStorage.getItem('user');

    if (ls) {
      console.log(ls);
      const user = JSON.parse(ls);
      setuserName(user.name);
    }
  }, []);
  return (
    <div className='header'>
      <div className='header-wrapper'>
        <div onClick={toggleMenuAction} className='hamburger-menu'>
          <HiMenuAlt1 />
        </div>
        <h2 className='task-title'>ITask</h2>
        <div className='search-box'>
          <input type='text' placeholder='search' />
          <div className='search-icon'>
            <BiSearchAlt />
          </div>
        </div>
        {userName && (
          <Link to='/profile'>
            <div className='profile flex flex-ai-c'>
              <p className='user-name'>
                <span>Hello,</span> {userName}
              </p>
              <div className='profile-wrapper'>
                <p className='first-letter flex flex-ai-c flex-jc-c'>
                  {userName.charAt(0).toUpperCase()}
                </p>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
