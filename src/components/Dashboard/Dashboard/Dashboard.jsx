import React, { useEffect } from 'react';
import { Bar, Line, Doughnut, Pie } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

import { FaUserFriends } from 'react-icons/fa';

import './Dashboard.style.scss';

const Dashboard = () => {
  useEffect(() => {
    const dashboard = document.querySelector('.main-menu');
    const userList = document.querySelector('.menu-item');
    const profile = document.querySelector('.profile-menu');

    dashboard.style.backgroundColor = '#eddbff';
    userList.style.backgroundColor = 'transparent';
    profile.style.backgroundColor = 'transparent';
  }, []);

  return (
    <div className='dashboard-content'>
      <div className='dashboard-content-wrapper'>
        <div className='title'>Dashboard</div>
        <div className='card-data'>
          <Link style={{ width: '100%' }} to='/user'>
            <div className='card card-1 flex flex-ai-c flex-jc-sb'>
              <div className='icon'>
                <FaUserFriends />
              </div>
              <div className='data'>
                <p className='count'>47</p>
                <div className='name'>User List</div>
              </div>
            </div>
          </Link>

          <div className='card card-2 flex flex-ai-c flex-jc-sb'>
            <div className='icon'>
              <FaUserFriends />
            </div>
            <div className='data'>
              <p className='count'>307</p>
              <div className='name'>Traffic</div>
            </div>
          </div>

          <div className='card card-3 flex flex-ai-c flex-jc-sb'>
            <div className='icon'>
              <FaUserFriends />
            </div>
            <div className='data'>
              <p className='count'>174</p>
              <div className='name'>Margin</div>
            </div>
          </div>

          <div className='card card-4 flex flex-ai-c flex-jc-sb'>
            <div className='icon'>
              <FaUserFriends />
            </div>
            <div className='data'>
              <p className='count'>264</p>
              <div className='name'>Purchase</div>
            </div>
          </div>
        </div>

        <div className='charts'>
          <div className='bar-chart chart-wrapper'>
            <h3 className='title'>Statistics</h3>
            <Bar
              data={{
                labels: ['Maths', 'Science', 'Computer', 'History'],
                datasets: [
                  {
                    label: 'Core Subjects',
                    data: [46, 70, 95, 70],
                    backgroundColor: 'rgb(140, 226, 247)',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                  },
                  {
                    label: 'Intrested Subjects',
                    data: [36, 10, 15, 90],
                    backgroundColor: 'rgb(52, 143, 239)',
                    borderColor: '#fff',
                    borderWidth: 1,
                    borderRadius: 5,
                  },
                ],
              }}
              options={({ responsive: true }, { maintainAspectRatio: false })}
            />
          </div>

          <div className='line-chart chart-wrapper'>
            <h3 className='title'>Revenue</h3>
            <Line
              data={{
                labels: ['Maths', 'Science', 'Computer', 'History', 'Biology'],
                datasets: [
                  {
                    label: 'Second dataset',
                    data: [53, 13, 25, 17, 70, 40, 70, 30],
                    fill: true,
                    backgroundColor: 'rgb(219, 234, 238)',
                    borderColor: 'rgba(75,192,192,1)',
                  },

                  {
                    label: 'First dataset',
                    data: [33, 53, 85, 41, 44, 65, 90, 50],
                    fill: true,
                    backgroundColor: 'rgba(75,192,192,0.2)',
                    borderColor: 'rgba(75,192,192,1)',
                  },
                ],
              }}
              // fill={true}
              tension={0.1}
              options={({ responsive: true }, { maintainAspectRatio: false })}
            />
          </div>

          <div className='doughnut-chart chart-wrapper'>
            <h3 className='title'>Doughnut</h3>
            <Doughnut
              data={{
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: [33, 53, 85, 41, 44],
                    backgroundColor: [
                      'rgb(239, 79, 76)',
                      'rgb(63, 81, 181)',
                      'rgb(0, 150, 136)',
                      'rgb(140, 226, 247)',
                      'rgb(91, 178, 62)',
                    ],
                  },
                ],
              }}
              fill='true'
              tension={0.1}
              options={({ responsive: true }, { maintainAspectRatio: false })}
            />
          </div>

          <div className='doughnut-chart chart-wrapper'>
            <h3 className='title'>Doughnut</h3>
            <Pie
              data={{
                labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
                datasets: [
                  {
                    label: 'Dataset 1',
                    data: [33, 53, 85, 41, 44],
                    backgroundColor: [
                      'rgb(239, 79, 76)',
                      'rgb(63, 81, 181)',
                      'rgb(0, 150, 136)',
                      'rgb(140, 226, 247)',
                      'rgb(91, 178, 62)',
                    ],
                  },
                ],
              }}
              fill='true'
              tension={0.1}
              options={({ responsive: true }, { maintainAspectRatio: false })}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
