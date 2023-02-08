import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom";
import Nike from "./ni.jpg"
import Adidas from "./ad.jpg"
import Jordan from "./jd.jpg"

function ImgSlider() {
    let settings = {
        dot: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "linear",
    }
    const images = [
        { url: "D:/csdl/web/demo2/src/components/imageSlider/ni.jpg", title: "nike"},
        { url: "src/components/imageSlider/jd.jpg", title: "jordan"},
        { url: "src/components/imageSlider/ad.jpg", title: "adidas"}
    ];
    const titleStyles = {
        fontSize: '30px',
        fontWeight: '800',
        color: 'black',
        textDecoration: 'none',
    }
    return (
        <Slider {...settings}>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src={Nike}/>
                    </div>
                    <div className="details">
                        <Link style={titleStyles} to="/?cat=nike">
                            <h2>NIKE</h2>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src={Jordan}/>
                    </div>
                    <div className="details">
                        <Link style={titleStyles} to="/?cat=jordan">
                            <h2>JORDAN</h2>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="card-wrapper">
                <div className="card">
                    <div className="card-image">
                        <img src={Adidas}/>
                    </div>
                    <div className="details">
                        <Link style={titleStyles} to="/?cat=adidas">
                            <h2>ADIDAS</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </Slider>
        
    )
}

export default ImgSlider;