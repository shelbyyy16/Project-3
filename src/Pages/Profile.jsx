import React from "react";
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
      <div className="profile-container">
        <div className="profile-card">
            <h1>Welcome to your garden, {user.name}</h1>
          </div>
          <div className="stock-image">
            <img src="/images/PottedPlantsVintage.png" alt="" />
          </div>
        </div>
    )
  );
};

export default Profile;