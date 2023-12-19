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
          <div className="profile-image">
            <img src={user.picture} alt={""} />
          </div>
          <div className="profile-details">
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default Profile;
