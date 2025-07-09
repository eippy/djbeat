import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation(): JSX.Element {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-left">
          <NavLink to="/" className="logo-link">
            <img src="/dj-logo.jpg" alt="Home" className="nav-logo" />
          </NavLink>
        </div>
        <div className="right-nav">
          <NavLink to="/songs/new" className="upload-button">
            Upload
          </NavLink>
          <ProfileButton />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
