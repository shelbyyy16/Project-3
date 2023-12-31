import React from "react";
import "./Profile.css"
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <div className="profile-container">
          <div className="profile-card">
            <h1>Welcome to your garden, {user.name}</h1>
          </div>
          <div className="stock-image">
            <img 
            src="/images/PottedPlantsVintage.png" 
            alt=""
            loading="lazy" />
          </div>
        </div>
        <div className="favorites-container">
          <div className="spacer"></div>
          <h2>Future Feature to come: Your Favorite Plants</h2>
        </div>
      </>
    )
  );
};

export default Profile;
