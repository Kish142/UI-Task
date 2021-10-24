import React, { useContext, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoadingSpinner from './components/Loading-spinner/LoadingSpinner';
import { UserContext } from './context/userLoggedIn';

// React lazy load feature
const LoginPage = React.lazy(() => import('./pages/Login-page/LoginPage'));
const DashboardPage = React.lazy(() =>
  import('./pages/Dashboard-page/DashboardPage')
);

const App = () => {
  // TO REMOVE CONSOLE'S ON PRODUCTION

  if (process.env.NODE_ENV === 'production') {
    console.log = () => {};
    console.error = () => {};
    console.debug = () => {};
  }

  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setIsUserLoggedIn] = useContext(UserContext);

  console.log(isUserLoggedIn);

  useEffect(() => {
    const ls = localStorage.getItem('user');

    if (ls) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [setIsUserLoggedIn]);

  return (
    <div className='app'>
      <React.Suspense fallback={<LoadingSpinner />}>
        <Switch>
          <Route
            exact
            path='/login'
            render={() =>
              isUserLoggedIn ? <Redirect to='/' /> : <LoginPage />
            }
          />
          <Route
            path='/*'
            render={() =>
              isUserLoggedIn ? <DashboardPage /> : <Redirect to='/login' />
            }
          />
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default App;
