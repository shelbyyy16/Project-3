import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Auth/LoginButton";
import LogoutButton from "./Auth/LogoutButton";

function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const navStyle = {
    display: "flex",
    justifyContent: "flex-end",
    padding: ".5rem",
    width: "100%",
    margin: "auto",
  };
  return (
    <header>
      <div className="NAV">
        <nav style={navStyle}>
          <Link to="/">
            <div className="home-nav">Home</div>
          </Link>
  <div className="login-logout-button">
        {/* A nested ternary can conditionally render multiple states */}
        {!isLoading ? (
          // if the loading variable is true - the ! will convert it to false and 'null' will be returned
          // if the loading variable is false - the ! will convert it to true and the next ternary will evaluate
          // if the user is authenticated (isAuthenticated === true), then a profile link and logout button are visible, otherwise, it will display the login button

          isAuthenticated ? (
            <span>
              <Link to="/profile">Profile</Link> || <LogoutButton />
            </span>
          ) : (
            <LoginButton />
          )
        ) : null}
      </div>
          <Link to="/plants">
            <div className="plants-nav">Plant Library</div>
          </Link>
          <Link to="/garden">
            <div className="favorites-nav">My Garden</div>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
