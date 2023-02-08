import { db } from "../db.js"

export const getPosts = (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
    db.query(q, [req.query.cat], (err,data)=>{
        if(err) return res.send(err)
        return res.status(200).json(data)
    })
}
export const getPost = (req,res)=>{
    const q =
    "SELECT p.p_id, `username`, `title`, `des`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.u_id = p.u_id WHERE p.p_id = ? ";

    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);
    });
}
export const addPost = (req,res)=>{
    res.json("from controller")
}
export const deletePost = (req,res)=>{
    res.json("from controller")
}
export const updatePost = (req,res)=>{
    res.json("from controller")
}