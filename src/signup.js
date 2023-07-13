import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Notification from './notification';
import "./login.css"

const SignUp = ({ navigate, setToken }) => {
    const [notify, setNotify] = useState(false)
    const [notificationMessage, setNotificationMessage] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigater = useNavigate();

    const close = () => {
        setNotify(false)
    }

    // register function
    const register = (e) => {
        e.preventDefault()

        const data = {
            "username": username,
            "password": password
        }

        if (username.length !== 0 && password.length !== 0 && confirmPassword.length !== 0) {
            if (password.length < 5) {
                setNotificationMessage("password is too short")
                setNotify(true)
            } else if (password !== confirmPassword) {
                setNotificationMessage("wrong confirmation password entered")
                setNotify(true)
            } else {
                axios.post('http://localhost:3001/register', data)
                    .then(res => {
                        localStorage.setItem('token', res.data.token);
                        setToken(res.data.token)
                        setUsername("")
                        setPassword("")
                        setConfirmPassword("")
                        console.log(res.data)
                        navigate(1)
                        navigater('/');
                    })
                    .catch(err => {
                        console.error(err.message);
                        setNotificationMessage("username already used for another account")
                        setNotify(true)
                    });
            }
        }
    }

    return (
        <div className="login">
            <div className="login_title">Sign Up</div>

            <form className="login_form" onSubmit={register}>
                <div>
                    <label>Username</label>
                    <div><input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} /></div>
                </div>
                <div>
                    <label>Password</label>
                    <div><input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                </div>
                <div>
                    <label>Confirm Password</label>
                    <div><input type="password" placeholder="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} /></div>
                </div>

                <div>
                    <button type="submit">Sign Up</button>
                </div>

                <div className="no_account">
                    <div>Already have an account? <span><Link to="/login" onClick={() => navigate(3)}>Login </Link></span></div>
                </div>
            </form>

            <Notification state={notify} close={close} message={notificationMessage} />
        </div>
    );
}

export default SignUp;