import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

const Register = () => {
    const [inputs, setInputs] = useState({
        username:"",
        email:"",
        password:"",
    })
    const [err, setError] = useState(null)

    const navigate = useNavigate()

    const handleChange = (e) =>{
        setInputs(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:8800/api/auth/register", inputs)
            navigate("/login")
        } catch(err) {
            setError(err.response.data)
        }
        
    }

    return (
        <div className="reg">
            <h1>REGISTER</h1>
            <form>
                
                <input type="text" placeholder="username" name="username" onChange={handleChange}/>
                
                <input type="email" placeholder="email" name="email" onChange={handleChange}/>
                
                <input type="password" placeholder="password" name="password" onChange={handleChange}/>
                <button onClick={handleSubmit}>Register</button>
                {err && <p>{err}</p>}
                <span>
                    Already have an account? {' '}
                    <Link to="/login" className="naviLogin">Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Register;