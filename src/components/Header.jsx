import { Link } from "react-router-dom";
import LoginButton from "./Auth/LoginButton";

function Header() {
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
          <div>
            <LoginButton />
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
