import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useLocation } from "react-router-dom";
import moment from "moment"

const Write = () => {
    const state = useLocation().state
    const [value, setValue] = useState(state?.des || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [cat, setCat] = useState(state?.cat || '');

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
            state
            ? await axios.put(`http://localhost:8800/posts/${state.pid}`, {
                title, des:value, img:file ? imgUrl : state.img
            }) :
            await axios.post(`http://localhost:8800/posts/`, {
                title, des:value, cat, img:file ? imgUrl : '', date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            }); 
        } catch(err) {
            console.log(err);
        }
    }
    // console.log(state);
    return (
        <div className="write">
            <div className="content">
                <input type="text" value={title} placeholder="Title" onChange={e=>setTitle(e.target.value)}/>
                <div className="editPlace">
                    <ReactQuill className="edit" theme="snow" value={value} onChange={setValue} />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Upload</h1>
                    <input style={{display:'none'}} type="file" name="" id="file" onChange={e=>setFile(e.target.files[0])}/>
                    <label className="file" htmlFor="file">Upload image</label>
                    <div className="buttons">
                        {/* <button>Save draft</button> */}
                        <button onClick={handleSubmit}>Post</button>
                    </div>
                </div>
                {/* <div className="item">
                    <h1>Category</h1>
                    <div className="cat">
                        <input type="radio" checked={cat === "nike"} name="cat" value="nike" id="nike" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="art">Nike</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "jordan"} name="cat" value="jordan" id="jordan" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="art">Jordan</label>
                    </div>
                    <div className="cat">
                        <input type="radio" checked={cat === "adidas"} name="cat" value="adidas" id="adidas" onChange={e=>setCat(e.target.value)}/>
                        <label htmlFor="art">Adidas</label>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default Write;