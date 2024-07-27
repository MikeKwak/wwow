// Logout.tsx
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../userContext';

function Logout() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const onSuccess = () => {
    console.log('Log out successful!');
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
    navigate('/'); // Redirect to home or login page
  };

  return (
    <div id="signOutButton">
      <GoogleLogout
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID!}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
