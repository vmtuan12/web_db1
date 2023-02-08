import axios from "axios";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from "../context/authContext";

const Comment = () => {

    const state = useLocation().state
    const [value, setValue] = useState(state?.content || '');
    
    const [comments, setComments] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    const {currentUser} = useContext(AuthContext)

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/comments/${postId}`)
                setComments(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetch()
    }, [])

    console.log(value);
    const handleSubmit = async (e) => {
        // e.preventDefault()
        try {
            await axios.post(`http://localhost:8800/comments/${postId}`, {
                content:value
            });
        } catch(err) {
            console.log(err);
        }
        refreshPage()
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="comments">
            <div className="split"></div>
            <div className="input">
                <input type="text" placeholder="Write your comment..." value={value} onChange={e=>setValue(e.target.value)}/>
                <Link className="link" to={`/post/${postId}`}>
                    <FontAwesomeIcon icon={faPlay} className="send" onClick={handleSubmit}></FontAwesomeIcon>
                </Link>
            </div>
            {comments.map(cmt => (
                <div className="comment" key={cmt.cmid}>
                    <div className="whole">
                        <div className="avt">
                            {cmt?.img && <img src={`../upload/${cmt?.uim}`} alt=""/>}
                        </div>
                        <div className="oneCmt">
                            <Link to={`/userinfo/${cmt.cmuName}`} className="link">
                                <h2>{cmt.cmuName}</h2>
                            </Link>
                            <p>{cmt.content}</p>
                        </div>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Comment;