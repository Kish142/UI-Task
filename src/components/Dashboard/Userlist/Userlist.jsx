import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHttpClient } from '../../../custom-hooks/httpClient';
import LoadingSpinner from '../../Loading-spinner/LoadingSpinner';

import './Userlist.style.scss';

const Userlist = () => {
  const [userList, setUserList] = useState();
  const [loading, setLoading] = useState(true);

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchRequest = async () => {
      setLoading(true);
      const response = await sendRequest(
        'https://randomuser.me/api/?results=10'
      );

      if (response) {
        setUserList(response.results);
        setLoading(false);
      }
    };

    fetchRequest();
  }, [sendRequest]);

  useEffect(() => {
    const dashboard = document.querySelector('.main-menu');
    const userList = document.querySelector('.menu-item');
    const profile = document.querySelector('.profile-menu');

    dashboard.style.backgroundColor = 'transparent';
    userList.style.backgroundColor = '#eddbff';
    profile.style.backgroundColor = 'transparent';
  }, []);

  const pagination = async (i) => {
    const page = document.querySelector(`.page-${i}`);
    const title = document.querySelector('.user-list-title');
    title.scrollIntoView({ behavior: 'smooth' });

    setLoading(true);

    const response = await sendRequest(
      `https://randomuser.me/api/?page=${i}&results=10`
    );

    if (response) {
      setUserList(response.results);
      setLoading(false);
    }

    for (var j = 1; j < 6; j++) {
      const pages = document.querySelector(`.page-${j}`);

      if (j !== i) {
        pages.classList.remove('dark-bg-color');
      }
    }

    page.classList.add('dark-bg-color');
  };

  return (
    <div className='user-list-section container-lg'>
      <div className='user-list-section-wrapper'>
        <div className='user-list-title title'>User List</div>
        {loading && <LoadingSpinner />}
        <div className='user-card-wrapper'>
          {userList &&
            !loading &&
            userList.map((user) => (
              <div key={user.login.uuid} className='user-card'>
                <div className='img'>
                  <img src={user.picture.large} alt='' />
                </div>
                <div className='user-details'>
                  <h4 className='user-name'>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h4>
                  <p className='gender'>
                    <strong>Gender: </strong>
                    {user.gender}
                  </p>
                  <p className='email'>
                    <strong>Email: </strong>
                    {user.email}
                  </p>
                  <p className='phone'>
                    <strong>Phone: </strong>
                    {user.cell}
                  </p>
                </div>
                <div className='view-detail-btn'>
                  <Link to='/user/agaotywta3525lag'>
                    <button>View Details</button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
        <div className='pagination flex flex-ai-c flex-jc-c'>
          <p onClick={() => pagination(1)} className='page-1 dark-bg-color'>
            1
          </p>
          <p onClick={() => pagination(2)} className='page-2'>
            2
          </p>
          <p onClick={() => pagination(3)} className='page-3'>
            3
          </p>
          <p onClick={() => pagination(4)} className='page-4'>
            4
          </p>
          <p onClick={() => pagination(5)} className='page-5'>
            5
          </p>
        </div>
      </div>
    </div>
  );
};

export default Userlist;
