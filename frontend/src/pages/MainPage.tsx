import React, { useEffect } from 'react';
import Header from 'components/Header';
import GetInTouch from 'components/GetInTouch';
import GetStarted from 'components/GetStarted';
import { useAuth0 } from '@auth0/auth0-react';

const MainPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    console.log(isAuthenticated);
    console.log(user);
  }, []);

  return (
    <>
      <Header />
      <GetInTouch />
      <GetStarted />
    </>
  );
};

export default MainPage;
