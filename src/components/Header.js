import React from "react";
import { NavLink } from "react-router-dom";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from 'gapi-script';

function Header({ isLoggedIn, userProfile, onLoginSuccess, onLogoutSuccess }) {
  gapi.load("client:auth2", () => {
    gapi.client.init({
      clientId:
        "283004803380-rt4f3dl76mtevsgejd9k74factjkbuv1.apps.googleusercontent.com",
      ux_mode: 'redirect'
    });
  });
  const onLoginFailure = (error) => {
    console.error("Login failed:", error);
    if (error.error === "popup_closed_by_user") {
      // Show a message to the user or handle this case as needed
      alert("Login was not completed. Please try again.");
    }
  };
  return (
    <header className="header bg-blue-500 text-white px-4 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <NavLink exact to="/" activeClassName="text-blue-200" className="mr-4">
          Home
        </NavLink>
        <NavLink to="/new-topic" activeClassName="text-blue-200">
          New Topic
        </NavLink>
      </div>
      {isLoggedIn ? (
        <GoogleLogout
          clientId="283004803380-rt4f3dl76mtevsgejd9k74factjkbuv1.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={onLogoutSuccess}
          // onFailure={(response) => console.error("Logout failed:", response)}
          onFailure={onLoginFailure} // Add this line
        />
      ) : (
        <GoogleLogin
          clientId="283004803380-rt4f3dl76mtevsgejd9k74factjkbuv1.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={onLoginSuccess}
          // onFailure={(response) => console.error("Login failed:", response)}
          onFailure={onLoginFailure} // Add this line
        />
      )}
      {isLoggedIn && userProfile && (
        <div className="flex items-center ml-4">
          <img
            src={userProfile.imageUrl}
            alt="Profile"
            className="h-10 w-10 rounded-full mr-2"
          />
          <span>{userProfile.name}</span>
        </div>
      )}
    </header>
  );
}

export default Header;
