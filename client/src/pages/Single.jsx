import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Comment from "../components/Comment";
import { AuthContext } from "../context/authContext";

const Single = () => {

    const [post, setPost] = useState({})
    const location = useLocation()
    const postId = location.pathname.split("/")[2]
    const {currentUser} = useContext(AuthContext)
    // console.log(`postid ${postId}`);

    const navigate = useNavigate()
    if(!currentUser) {
        navigate("/login")
    }

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/posts/${postId}`)
                setPost(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetch()
    }, [postId])

    const handleDelete = async()=>{
        try {
            await axios.delete(`http://localhost:8800/posts/${postId}`)
            navigate("/")
        } catch(err) {
            console.log(err)
        }
    }
    console.log(`vai dai ${post?.img}`);
    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    return (
        <div className="single">
            <div className="stt">
                <div className="content">
                    <div className="user">
                        <div className="info">
                            <div className="im">
                                {post.uim && <img src={`../upload/${post.uim}`} alt=""/>}
                            </div>
                            <div className="name">
                                <Link to={`/userinfo/${post.username}`} className="link">
                                    <span>{post.username}</span>
                                </Link>
                                <p>Posted {moment(post.date).fromNow()}</p>
                            </div>
                        </div>
                        {currentUser.u_id === post.u_id && <div className="edit">
                            <Link to={`/write?edit=2`} className='link' state={post}>
                                <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                            </Link>
                            
                            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} className="icon"></FontAwesomeIcon>
                        </div>}
                    </div>
                    <div className="pImg">
                        {post?.img && <img src={`../upload/${post?.img}`} alt=""/>}
                    </div>
                </div>
                <div className="text">
                    <h1><b>{post.title}</b></h1>
                    <p className="des">{getText(post.des)}</p>
                </div>
            </div>
            <Comment />
            
        </div>
    )
}

export default Single;