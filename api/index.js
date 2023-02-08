import express from "express"
import mysql from "mysql"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import multer from "multer"
import {useContext, useState} from "react"
import { info, uName } from "./controller/auth.js"
// import authContext from "../client/src/context/authContext.js"

// const {currentUser} = useContext(AuthContext)

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Tuan$281203",
    database:"vcl1"
})

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/posts", postRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})

const upload = multer({ storage: storage })
app.post('/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename)
})

app.get("/posts", (req,res)=>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/posts/:id", (req,res)=>{
    const q = "SELECT * FROM (SELECT des, date, title, posts.img AS img, users.img AS uim, posts.p_id AS pid, posts.u_id, username FROM users JOIN posts ON users.u_id = posts.u_id WHERE p_id = ?) AS up LEFT JOIN comments AS c ON up.pid = c.cmpid;"
    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data[0])
    })
})

app.get("/users/:id", (req,res)=>{
    const q = "SELECT * FROM users JOIN posts ON users.u_id = posts.u_id WHERE users.username = ?"
    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.get("/userInfo/:id", (req,res)=>{
    const q = "SELECT u_id AS uid, img AS uim, email FROM users WHERE username = ?"
    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data[0])
    })
})

app.get("/comments/:id", (req,res)=>{
    const q = "SELECT *, uuu.img AS uim FROM (SELECT * FROM (SELECT des, date, title, posts.img AS img, posts.p_id AS pid, posts.u_id, username FROM users JOIN posts ON users.u_id = posts.u_id WHERE p_id = ?) AS up LEFT JOIN comments AS c ON up.pid = c.cmpid) AS `uc*` LEFT JOIN users uuu ON cmuName = uuu.username;"
    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.get("/following/:id", (req,res)=>{
    const q = "SELECT username, img, following FROM follow f JOIN users u on u.u_id = f.following WHERE uid = ?"
    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.get("/follower/:id", (req,res)=>{
    const q = "SELECT username, img, uid FROM follow f JOIN users u ON u.u_id = f.uid WHERE following = ?"
    db.query(q, [req.params.id], (err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.get("/haveFollowed/:id", (req,res)=>{
    const q = "SELECT * FROM follow WHERE uid = ? AND following = ?"
    
    db.query(q, [req.body.uid, req.params.id], (err,data)=>{
        // console.log(req.body.userid + " " + req.params.id);
        if(err) return res.json(err)
        return res.status(200).json(data)
    })
})

app.post("/comments/:id", (req,res)=>{
    const q = "INSERT INTO comments(`cmuid`, `cmpid`, `cmuName`, `content`) VALUES (?)"
    const values = [
        info(),
        req.params.id,
        uName(),
        req.body.content,
    ]
    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("comment successfully")
    })
})

app.post("/posts", (req,res)=>{
    const q = "INSERT INTO posts(`title`, `des`, `img`, `date`, `u_id`, `cat`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.des,
        req.body.img,
        req.body.date,
        info(),
        req.body.cat,
    ]
    console.log(info());
    db.query(q, [values], (err,data)=>{
        if(err) return res.status(500).json(err)
        return res.json("post has been created")
    })
})

app.delete("/posts/:id", (req,res)=>{
    const bookId = req.params.id
    const q = "DELETE FROM posts WHERE p_id = ?"
    db.query(q, bookId, (err,data) =>{
        if(err) return res.json(err)
        return res.json("delete successfully")
    })
})

app.put("/posts/:id", (req,res)=>{
    const postId = req.params.id
    // console.log(postId);
    const q = "UPDATE posts SET `title`=?, `des`=?, `img`=? WHERE `p_id`=?"
    const values = [
        req.body.title,
        req.body.des,
        req.body.img,
    ]
    db.query(q, [...values, postId], (err,data)=>{
        if(err) return res.status(500).json(err)
        return res.json("post has been updated")
    })
})

app.put("/users/:id", (req,res)=>{
    const userId = req.params.id
    const q = "UPDATE users SET `img`=? WHERE `username`=?"
    db.query(q, [req.body.img, userId], (err,data)=>{
        if(err) return res.status(500).json(err)
        return res.json("user has been updated")
    })
})

app.listen(8800, ()=>{
    console.log("connected");
})