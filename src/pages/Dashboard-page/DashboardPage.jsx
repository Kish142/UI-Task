import React, { useState } from 'react';
import Dashboard from '../../components/Dashboard/Dashboard/Dashboard';
import Header from '../../components/Dashboard/Header/Header';
import Sidebar from '../../components/Dashboard/Sidebar/Sidebar';
import UserDetail from '../../components/Dashboard/User-detail/UserDetail';
import Userlist from '../../components/Dashboard/Userlist/Userlist';
import Profile from '../../components/Profile/Profile';

import { Route, Switch } from 'react-router-dom';
import './DashboardPage.style.scss';

const DashboardPage = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleMenuAction = () => {
    setToggleMenu(!toggleMenu);
  };

  const closeMenu = () => {
    setToggleMenu(false);
  };

  return (
    <div className='dashboard-page'>
      <Header toggleMenuAction={toggleMenuAction} />
      <div style={{ gap: '10px' }} className='flex'>
        <Sidebar toggleMenu={toggleMenu} closeMenu={closeMenu} />

        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route exact path='/user' component={Userlist} />
          <Route exact path='/user/:id' component={UserDetail} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </div>
    </div>
  );
};

export default DashboardPage;
