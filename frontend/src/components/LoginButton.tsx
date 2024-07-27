// Login.tsx
import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login';
import { useUser, User } from '../userContext';

function Login() {
  const { setUser } = useUser();

  const onSuccess = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if ('profileObj' in response) {
      console.log('Login Success:', response.profileObj);
      const profile = response.profileObj;
      const user: User = {
        imgUrl: profile.imageUrl,
        email: profile.email,
        name: profile.name,
      };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user)); // Store user in localStorage
    }
  };

  const onFailure = (response: any) => {
    console.log('Login Failed:', response);
    // Handle login failure (show message, retry option, etc.)
  };

  return (
    <div id="signInButton">
      <GoogleLogin
        clientId={process.env.REACT_APP_OAUTH_CLIENT_ID!}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
