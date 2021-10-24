import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../context/userLoggedIn';

import SvgImg from '../../assets/login_page_illustration.svg';

import './Login.style.scss';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    name: false,
    password: false,
  });

  const history = useHistory();

  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserContext);

  const onChangeEvent = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    setFormError({ ...formError, [name]: false });
  };

  const onSubmitEvent = (e) => {
    e.preventDefault();

    const { name, password } = formData;

    console.log(name, password);

    if (name === '' || password === '') {
      return setFormError({ name: true, password: true });
    }

    if (name === '') {
      return setFormError({ name: true });
    }

    if (password === '') {
      return setFormError({ password: true });
    }

    const userData = {
      name: formData.name,
    };

    localStorage.setItem('user', JSON.stringify(userData));

    setIsUserLoggedIn(true);

    return history.push('/');
  };

  return (
    <div className='login-page-section'>
      <div className='login-page-wrapper'>
        <div className='image-col'>
          <div className='img'>
            <img src={SvgImg} alt='svg' />
          </div>
        </div>
        <div className='form-col'>
          <h2 className='heading'>Hello! Welcome Back</h2>

          <h4 className='title'>
            <span>Login</span> To Your Account
          </h4>

          <form onSubmit={onSubmitEvent} action=''>
            <div className='username-field'>
              <label htmlFor='name'>UserName</label>
              <input
                className={formError.name ? 'input-error' : ''}
                onChange={onChangeEvent}
                value={formData.name}
                name='name'
                type='text'
                id='name'
                placeholder='Enter Your Username'
              />
              <div
                style={{ display: formError.name ? 'block' : 'none' }}
                className='form-error'
              >
                <p>Please fill this field</p>
              </div>
            </div>
            <div className='password-field'>
              <label htmlFor='password'>Password</label>
              <input
                className={formError.password ? 'input-error' : ''}
                onChange={onChangeEvent}
                value={formData.password}
                name='password'
                type='password'
                id='password'
                placeholder='Enter Your Password'
              />
              <div
                style={{ display: formError.password ? 'block' : 'none' }}
                className='form-error'
              >
                <p>Please fill this field</p>
              </div>
            </div>
            <button type='submit' className='submit'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
