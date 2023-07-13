import { Link } from 'react-router-dom';
import "./nav.css"

const Nav = ({ active, navigate, userID, username, logout }) => {
    return (
        <div className="nav">
            <div className="app_title">YumYum</div>

            <div className="nav_options">
                <div><Link to="/" className={active === 1 ? "active" : ""} onClick={()=> navigate(1)}>Home</Link></div>
                {userID !== "" ? <div><Link to="/" className={active === 2 ? "active" : "" } onClick={()=> navigate(2)}>My Recipes</Link></div> : ""}
                {userID === "" ? <div><Link to="/login" className={active === 3 ? "active" : ""} onClick={()=> navigate(3)}>Login</Link> / <Link to="/signup" className={active === 4 ? "active" : ""} onClick={()=> navigate(4)}>Sign up</Link></div> : "" }
                {userID !== "" ? <div className="logout" onClick={logout}>Logout</div> : ""}
            </div>
        </div>
    );
}

export default Nav;