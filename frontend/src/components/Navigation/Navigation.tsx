import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

function Navigation(): JSX.Element {
  const user = useSelector((state: RootState) => state.session.user)
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        {user && (
          <li>
            <NavLink to="/songs/new">Upload</NavLink>
          </li>
      )}
        
      </li>
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
