import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";

function Header({ setSearchQuery }) {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header>
      <div>
        <nav className="nav">
          <Link to="/">
            <div className="home-nav">Petals & Pots</div>
          </Link>
          <div className="login-logout-button">
            {/* A nested ternary can conditionally render multiple states */}
            {!isLoading ? (
              isAuthenticated ? (
                <span>
                  <Link to="/profile">Profile</Link> || <LogoutButton />
                </span>
              ) : (
                <LoginButton />
              )
            ) : null}
          </div>
          <Link to="/indoorplants">
            <div className="plants-nav">Indoor Plant Library</div>
          </Link>
          <Link to="/outdoorplants">
            <div className="plants-nav">Outdoor Plant Library</div>
          </Link>
          <Link to="/garden">
            <div className="favorites-nav">My Garden</div>
          </Link>
          <input
            type="text"
            placeholder="Search for plants..."
            onChange={handleSearch}
          />
          <Link to="/search">
            <div className="search-nav">Search</div>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;