import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";

const ImageSlider = ({slides}, {length}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderStyles = {
        height: '100%',
        position: 'relative',
    }
    const slideStyles = {
        width: '100%',
        height: '100%',
        borderRadius: '10%',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${slides[currentIndex].url})`,
        textAlign: 'center',
        
    }
    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '32px',
        fontSize: '45px',
        color: 'cyan',
        zIndex: 1,
        cursor: 'pointer',        
    }
    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '32px',
        fontSize: '45px',
        color: 'cyan',
        zIndex: 1,
        cursor: 'pointer', 
    }
    const titleStyles = {
        fontSize: '30px',
        fontWeight: '800',
        color: 'black',
        textDecoration: 'none',
        backgroundColor: 'white',
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1; //fix
        setCurrentIndex(newIndex);
    }
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }
    let pageLink = `/?cat=${slides[currentIndex].title.toLowerCase()}`
    return (
        <div style={sliderStyles} className="slider">
            <FontAwesomeIcon icon={faCaretLeft} style={leftArrowStyles} onClick={goToPrevious}></FontAwesomeIcon>
            <FontAwesomeIcon icon={faCaretRight} style={rightArrowStyles} onClick={goToNext}></FontAwesomeIcon>
            <div style={slideStyles}>
                
            </div>
            <Link to="/post/1" style={titleStyles}>
                <p>{slides[currentIndex].title}</p>
            </Link>
        </div>
        
    )
}

export default ImageSlider;