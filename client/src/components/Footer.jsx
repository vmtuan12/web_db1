import React from "react";
import Logo from "../img/logo123.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";

const Footer = () => {
    return (
        <footer>
            <div1 className="div1">
                <img src={Logo} alt="" />
            </div1>
            <div2 className="div2">
                <div><b>For work</b></div>
                <div>
                    <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> minhtuan3154@gmail.com
                </div>
                <div>
                    <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> 0981054950
                </div>
                <div>
                    Social media:
                    <a href="https://www.facebook.com/mhtuannn/" className="icon">
                        <FontAwesomeIcon icon={faFacebook}></FontAwesomeIcon>
                    </a>
                    <a href="https://www.instagram.com/mhtuannn/" className="icon">
                        <FontAwesomeIcon icon={faInstagram}></FontAwesomeIcon>
                    </a>
                </div>
            </div2>
        </footer>
    )
}

export default Footer;