import React from "react";

const Following = (props) => {
    return (props.trigger) ? (
        <div className="popup">
            <div className="top">
                <div className="title">
                    Following
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

export default Following;