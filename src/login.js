import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Notification from "./notification";
import "./login.css"

const Login = ({navigate, setToken}) => {
    const [notify, setNotify] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigater = useNavigate();

    const close = () => {
        setNotify(false)
    }

    // login function
    const login = (e) => {
        e.preventDefault()

        const data = {
            "username": username,
            "password": password
        }

        if (username.length !== 0 && password.length !== 0) {
            axios.post('http://localhost:3001/login', data)
                .then(res => {
                    localStorage.setItem('token', res.data.token);
                    setToken(res.data.token)
                    setUsername("")
                    setPassword("")
                    console.log(res.data)
                    navigate(1)
                    navigater('/');
                })
                .catch(err => {
                    console.error(err.message);
                    setNotify(true)
                });
        }
    }

    return (
        <div className="login">
            <div className="login_title">Login</div>

            <form className="login_form" onSubmit={login}>
                <div>
                    <label>Username</label>
                    <div><input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                </div>
                <div>
                    <label>Password</label>
                    <div><input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                </div>

                <div className="forgot">
                    <div>Forgot Password?</div>
                </div>

                <div>
                    <button type="submit">Login</button>
                </div>

                <div className="no_account">
                    <div>You do not have an account? <span><Link to="/signup" onClick={()=> navigate(4)}>Sign Up</Link></span></div>
                </div>
            </form>

            <Notification state={notify} close={close} message="wrong user details entered" />
        </div>
    );
}

export default Login;