import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./nav";
import Home from "./home";
import Login from "./login";
import SignUp from "./signup";
import { useState, useEffect } from "react";
import axios from 'axios';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [userID, setUserID] = useState("")
  const [username, setUsername] = useState("")

  const [active, setActive] = useState(1)
  const navigate = (position) => {
    setActive(position)
  }

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null)
    setUserID("")
    setUsername("")
  }

  useEffect(() => {
    const headers = { authorization: `Bearer ${token}` }

    if (token !== null) {
      axios.post('http://localhost:3001/authenticate', { headers })
        .then(res => {
          setUserID(res.data.user.id)
          setUsername(res.data.user.username)
        })
        .catch(err => {
          console.error(err.message)
          logout()
        })
    }
  }, [token]);

  return (
    <div className="App">
      <BrowserRouter>
        {/* {userID}
        {username} */}
        <Nav active={active} navigate={navigate} userID={userID} username={username} logout={logout}/>

        <Routes>
          <Route path="/" element={<Home userID={userID} username={username} />} />
          <Route path="/login" element={<Login navigate={navigate} setToken={setToken} />} />
          <Route path="/signup" element={<SignUp navigate={navigate} setToken={setToken} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
