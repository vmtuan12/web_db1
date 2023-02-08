import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo123.png"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext)
    const {logout} = useContext(AuthContext)

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to='/'>
                        <img src={Logo} alt="" />
                    </Link>
                </div>
                <div className="blogName">
                    <Link to='/' className="link">
                        MTBLOG
                    </Link>
                </div>
                <div className="links">
                    <Link to={`/userinfo/${currentUser?.username}`} className="link">
                        {/* <span>{currentUser?.username}</span> */}
                        <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                    </Link>
                    <span>
                        <Link className="wrt" to="/write"><b>Write</b></Link>
                    </span>
                    {currentUser ? (
                        <span onClick={logout} className="logout">Logout</span>
                    ) : (
                        <Link className="link" to="/login">
                            Login
                        </Link>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar;