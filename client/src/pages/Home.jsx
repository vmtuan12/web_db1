import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageSlider from "../components/imageSlider/ImageSlider";
import ImgSlider from "../components/imageSlider/Slider";
import { AuthContext } from "../context/authContext";

const Home = () => {

    // const posts = [
    //     {
    //         id: 1,
    //         title: "vcl1",
    //         desc: "desc1",
    //         img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
    //     },
    //     {
    //         id: 2,
    //         title: "vcl2",
    //         desc: "desc2",
    //         img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
    //     },
    //     {
    //         id: 3,
    //         title: "vcl3",
    //         desc: "desc3",
    //         img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
    //     },
    //     {
    //         id: 4,
    //         title: "vcl4",
    //         desc: "desc4",
    //         img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
    //     },
    // ];

    const {currentUser} = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const navigate = useNavigate()
    if(!currentUser) {
        navigate("/login")
    }
    useEffect(()=>{
        const fetch = async ()=>{
            try{
                const res = await axios.get('http://localhost:8800/posts')
                setPosts(res.data)
            } catch(err) {
                console.log(err)
            }
        }
        fetch()
    }, [])

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent
    }
    console.log(posts);
    return (
        <div className="home">
            <div className="posts">
                {posts.map(post =>(
                    <div className="post" key={post.p_id}>
                        <div className="img">
                            {post.img && <img src={`../upload/${post.img}`} alt="" />}
                        </div>
                        <div className="content">
                            <Link to={`/post/${post.p_id}`} className="link">
                                <h1 className="tit">{post.title}</h1>
                                <button>READ MORE</button>
                            </Link>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default Home;