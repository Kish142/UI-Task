import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ImLocation } from 'react-icons/im';

import './UserDetail.style.scss';
import { useHttpClient } from '../../../custom-hooks/httpClient';

const UserDetail = () => {
  const [user, setUser] = useState();
  const [viewport, setViewport] = useState();

  const { sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchRequest = async () => {
      const response = await sendRequest('https://randomuser.me/api/');

      if (response) {
        setUser(response.results);

        const coordinates = response.results[0].location.coordinates;
        setViewport({
          latitude: parseFloat(coordinates.latitude),
          longitude: parseFloat(coordinates.longitude),
          zoom: 1,
        });
      }
    };

    fetchRequest();
  }, [sendRequest]);

  viewport && console.log(viewport);

  return (
    <div className='user-detail-section container-lg'>
      <div className='title'>User Detail</div>
      <div className='user-detail-section-wrapper'>
        {user &&
          user.map((i) => (
            <div key={i.login.uuid} className='row'>
              <div className='user-img'>
                <img src={i.picture.large} alt='' />
              </div>
              <div className='user-name'>
                <h3>{`${i.name.title} ${i.name.first} ${i.name.last}`}</h3>
              </div>
              <div className='user-details'>
                <div className='col'>
                  <p className='gender'>
                    <strong>Gender: </strong>
                    {i.gender}
                  </p>
                  <p className='dob'>
                    <strong>Date Of Birth: </strong>
                    {i.dob.date}
                  </p>
                  <p className='email'>
                    <strong>Email: </strong>
                    {i.email}
                  </p>
                  <p className='phone'>
                    <strong>Phone: </strong>
                    {i.cell}
                  </p>
                </div>
                <div className='col address'>
                  <p className='state'>
                    <strong>State: </strong>
                    {i.location.state}
                  </p>
                  <p className='street'>
                    <strong>Street: </strong>
                    {`${i.location.street.number}, ${i.location.street.name}`}
                  </p>
                  <p className='city'>
                    <strong>City: </strong>
                    {i.location.city}
                  </p>
                  <p className='timezone'>
                    <strong>TimeZone: </strong>
                    {i.location.timezone.offset}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {user && (
        <div className='map'>
          <h3 className='title'>User Location</h3>

          <ReactMapGL
            {...viewport}
            width='100%'
            height='400px'
            mapboxApiAccessToken='pk.eyJ1Ijoia2lzaDE0MiIsImEiOiJja3V6eW5veTAwdHpvMnFwYjVrZGhyajdvIn0.YOH6Z3JS4H04aNSa9BY5Fw'
            mapStyle='mapbox://styles/kish142/ckuzzpn8107ip14vo0yrc29e0'
            onViewportChange={(viewport) => setViewport(viewport)}
          >
            <Marker
              // latitude={parseInt(location.latitude)}
              // longitude={parseInt(location.longitude)}
              latitude={parseFloat(user[0].location.coordinates.latitude)}
              longitude={parseFloat(user[0].location.coordinates.longitude)}
              // offsetLeft={-20}
              // offsetTop={-10}
            >
              <div
                style={{ color: '#44217c', fontSize: '1.5rem' }}
                className='icon'
              >
                <ImLocation />
              </div>
            </Marker>
          </ReactMapGL>
        </div>
      )}
    </div>
  );
};

export default UserDetail;
