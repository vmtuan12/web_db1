import React from "react";

const Follower = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="top">
                <div className="title">
                    Follower
                </div>
                <div className="close_btn">
                    <button onClick={() => props.setTrigger(false)}>×</button>
                </div>
            </div>
            <div className="popupInner">
                
                { props.children }
            </div>
        </div>
    ) : "";
}

export default Follower;