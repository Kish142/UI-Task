import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { ImLocation } from 'react-icons/im';
import axios from 'axios';

import './Profile.style.scss';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: '',
    addressLine: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
  });

  const [viewport, setViewport] = useState();
  const [location, setLocation] = useState();

  const onChangeEvent = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const ls = localStorage.getItem('user');
    const user = JSON.parse(ls);
    setFormData({ ...formData, username: user.name });
  }, []);

  const geoCoding = async () => {
    const { addressLine, street, city, state, zipcode, country } = formData;

    const addressQuery = `${addressLine} ${street} ${city} ${zipcode} ${state} ${country}`;

    console.log(addressQuery);
    console.log(formData);

    const response = await axios(
      'https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(addressQuery) +
        '.json?access_token=' +
        'pk.eyJ1Ijoia2lzaDE0MiIsImEiOiJja3V6eW5veTAwdHpvMnFwYjVrZGhyajdvIn0.YOH6Z3JS4H04aNSa9BY5Fw'
    );

    if (response) {
      const data = await response.data;

      const coordinates = data.features[0].geometry.coordinates;
      console.log(coordinates);
      setViewport({
        latitude: coordinates[1],
        longitude: coordinates[0],
        zoom: 8,
      });
      setLocation({
        latitude: coordinates[1],
        longitude: coordinates[0],
      });
    }
  };

  console.log(location);

  const onSubmit = (e) => {
    e.preventDefault();
    geoCoding();
  };

  useEffect(() => {
    const dashboard = document.querySelector('.main-menu');
    const userList = document.querySelector('.menu-item');
    const profile = document.querySelector('.profile-menu');

    dashboard.style.backgroundColor = 'transparent';
    userList.style.backgroundColor = 'transparent';
    profile.style.backgroundColor = '#eddbff';
  }, []);

  return (
    <div className='profile-section container-lg'>
      <div className='profile-section-wrapper'>
        <div className='title'>Edit Profile</div>
        <form onSubmit={onSubmit} action=''>
          <div className='username'>
            <label htmlFor='name'>Username</label>
            <input
              onChange={onChangeEvent}
              value={formData.username}
              type='text'
              id='name'
              name='username'
              placeholder='Your Username'
            />
          </div>
          <div className='addresss'>
            <div className='row'>
              <div className='col'>
                <label htmlFor='address-line'>Address Line</label>
                <input
                  onChange={onChangeEvent}
                  value={formData.addressLine}
                  id='address-line'
                  type='text'
                  name='addressLine'
                  placeholder='Enter Your Address'
                />
              </div>
              <div className='col'>
                <label htmlFor='street'>Street Name</label>
                <input
                  onChange={onChangeEvent}
                  value={formData.street}
                  id='street'
                  type='text'
                  name='street'
                  placeholder='Enter Your Street Name'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label htmlFor='pincode'>City</label>
                <input
                  onChange={onChangeEvent}
                  value={formData.city}
                  id='pincode'
                  type='text'
                  name='city'
                  placeholder='Enter Your Pincode'
                />
              </div>
              <div className='col'>
                <label htmlFor='state'>State</label>
                <input
                  onChange={onChangeEvent}
                  value={formData.state}
                  id='state'
                  type='text'
                  name='state'
                  placeholder='Enter Your State'
                />
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <label htmlFor='zipcode'>Zip Code</label>
                <input
                  onChange={onChangeEvent}
                  value={formData.zipcode}
                  type='text'
                  id='zipcode'
                  name='zipcode'
                  placeholder='Enter Your Zip code'
                />
              </div>
              <div className='col'>
                <label htmlFor='country'>Country</label>
                <input
                  onChange={onChangeEvent}
                  value={formData.country}
                  type='text'
                  id='country'
                  name='country'
                  placeholder='Enter Your Country Name'
                />
              </div>
            </div>
          </div>
          <button type='submit' className='submit'>
            Save
          </button>
        </form>
      </div>

      {location && viewport && (
        <div className='map'>
          <h3 className='title'>Your Location</h3>

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
              latitude={location.latitude}
              longitude={location.longitude}
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

export default Profile;
