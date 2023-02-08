import React from "react";

const Menu = () => {
    const posts = [
        {
            id: 1,
            title: "vcl1",
            desc: "desc1",
            img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
        },
        {
            id: 2,
            title: "vcl2",
            desc: "desc2",
            img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
        },
        {
            id: 3,
            title: "vcl3",
            desc: "desc3",
            img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
        },
        {
            id: 4,
            title: "vcl4",
            desc: "desc4",
            img: "https://images.pexels.com/photos/5584504/pexels-photo-5584504.jpeg?cs=srgb&dl=pexels-jock-mark-5584504.jpg&fm=jpg"
        },
    ];
    return (
        <div className="menu">
            <h1>Related posts</h1>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={post.img} alt="" />
                    <h2>{post.title}</h2>
                    <button>READ MORE</button>
                </div>
            ))}
        </div>
    )
}

export default Menu;