import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Follower from "../components/Follower";
import Following from "../components/Following";

const UserInfo = () => {

    const [user, setUser] = useState([])
    const [userInfo, setUserInfo] = useState([])
    const [following, setFollowing] = useState([])
    const [follower, setFollower] = useState([])
    const [haveFollowed, setHaveFollowed] = useState([])
    const location = useLocation()
    const userName = location.pathname.split("/")[2]
    const [buttonPopupFollower, setButtonPopupFollower] = useState(false)
    const [buttonPopupFollowing, setButtonPopupFollowing] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate()
    if(!currentUser) {
        navigate("/login")
    }

    useEffect(()=>{
        const fetch = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/users/${userName}`)
                setUser(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetch()
    }, [])

    useEffect(()=>{
        const fetch2 = async ()=>{
            try {
                const res = await axios.get(`http://localhost:8800/userInfo/${userName}`)
                setUserInfo(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetch2()
    }, [])

    useEffect(()=>{
        const fetch3 = async()=>{
            try {
                const res = await axios.get(`http://localhost:8800/following/${currentUser.uid}`)
                setFollowing(res.data)
            } catch(err) {
                console.log(err);
            }
        }
        fetch3()
    })

    useEffect(()=>{
        const fetch4 = async()=>{
            try {
                const res = await axios.get(`http://localhost:8800/follower/${currentUser.uid}`)
                setFollower(res.data)
            } catch(err) {
                console.log(err);
            }
        }
        fetch4()
    })

    // useEffect(()=>{
    //     const fetch4 = async()=>{
    //         try {
    //             const res = await axios.get(`http://localhost:8800/haveFollowed/${userInfo.uid}`, {
    //                 userid:currentUser.uid
    //             })
    //             setHaveFollowed(res.data)
    //         } catch(err) {
    //             console.log(err);
    //         }
    //     }
    //     fetch4()
    // })
    // console.log(currentUser.uid + " " + userInfo.uid);

    const [file, setFile] = useState(null);
    const upload = async()=>{
        try {
            const form = new FormData()
            form.append("file", file)
            const res = await axios.post("http://localhost:8800/upload", form)
            return res.data
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const imgUrl = await upload()

        try {
            await axios.put(`http://localhost:8800/users/${userName}`, {
                img:file ? imgUrl : null
            })
        } catch(err) {
            console.log(err);
        }
    }
    // console.log(userInfo);
    // console.log(user);
    const havePosts = user.length > 0;
    return (
        <div className="userInfo">
            <div className="user">
                <div className="uInfo">
                    <div className="avatar">
                        {userInfo.uim && <img src={`../upload/${userInfo.uim}`} alt=""/>}
                        <span>{userName}</span>
                    </div>
                    <div className="email">Email: {userInfo.email}</div>
                </div>
                {userName.localeCompare(currentUser.username) === 0 ?
                <div className="av">
                    <div className="upAvt">
                        <input style={{display:'none'}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
                        <label className="file" htmlFor="file">Upload avatar</label>
                        <button onClick={handleSubmit}>Confirm</button>
                    </div>
                    <div className="fl">
                        <div className="flwer" onClick={() => setButtonPopupFollower(true)}>Follower</div>
                        <div className="flwing" onClick={() => setButtonPopupFollowing(true)}>Following</div>
                    </div>
                </div> : 
                <div className="follow">
                    <button>Follow</button>
                </div>}
            </div>
            <div className="split"></div>
            {havePosts ?
            <div className="posts">
                {user.map(post =>(
                    <div className="post" key={post.p_id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link to={`/post/${post.p_id}`} className="link">
                                <h1>{post.title}</h1>
                                <button>READ MORE</button>
                            </Link>
                            
                        </div>
                    </div>
                ))}
            </div>
            : <div className="noPost">NO POST YET</div>}
            
            <Follower trigger={buttonPopupFollower} setTrigger={setButtonPopupFollower}>
                <div className="name">
                    {follower.map(fler => (
                        <div className="person" key={fler.following}>
                            <div className="img">
                                <img src={`../upload/${fler.img}`} alt="" />
                            </div>
                            <div className="personName">
                                <Link className="personName" to={`/userinfo/${fler.username}`}>
                                    {fler.username}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Follower>
            <Following trigger={buttonPopupFollowing} setTrigger={setButtonPopupFollowing}>
                <div className="name">
                    {following.map(fling => (
                        <div className="person" key={fling.following}>
                            <div className="img">
                                <img src={`../upload/${fling.img}`} alt="" />
                            </div>
                            <div className="personName">
                                <Link className="personName" to={`/userinfo/${fling.username}`}>
                                    {fling.username}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Following>
        </div>
    )
}

export default UserInfo