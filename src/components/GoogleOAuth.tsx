import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Define your Google OAuth client ID and redirect URI
const clientId = '784619188209-a1cmllig1omc0amcudtb69o5ro0njv86.apps.googleusercontent.com';
// const clientId = '713217624008-m6j70vmmemp7o13hnv27nv4v9os8mjs8.apps.googleusercontent.com';


function GoogleOAuth() {
  // State to manage the user's login status
  const oAuthUrl = `https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/youtube.readonly&response_type=code&access_type=offline&redirect_uri=https://handel.network&client_id=${clientId}`;

  // https://8d5c-103-44-107-173.ngrok-free.app/?code=4/0AfJohXklbjTCNwetujb8OOtyzIpsHrwb4tHtJTBVb9fwtKrf7Dt7orwEbOu3S01CHjJXMw&scope=https://www.googleapis.com/auth/youtube.readonly

  return (
    <div className="bg-brandGrey min-h-full min-w-full flex flex-col items-center">
      <h1>Google OAuth 2.0 Example</h1>
      <button
        className='p-4 mt-4 bg-lightBrand text-brand w-full hover:bg-brand hover:text-white rounded-lg'
        onClick={() => {
          window.location.href = oAuthUrl;
        }}
      >
        Login with Google
      </button>

    </div>
  );
}

export default GoogleOAuth;

