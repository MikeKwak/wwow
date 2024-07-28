import React, { useEffect } from 'react';
import Header from 'components/Header';
import GetInTouch from 'components/GetInTouch';
import GetStarted from 'components/GetStarted';

const MainPage: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Header />
      <GetInTouch />
      <GetStarted />
    </>
  );
};

export default MainPage;
