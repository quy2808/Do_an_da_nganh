import './login.css';
import logo from './smart_plant.jpg';
import Header from '../../Components/Header/Header';

import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Dialog } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessages, setErrorMessages] = useState("");
    const [changepage, setChangepage] = useState(false)

    // Set username login info
    useEffect(() => {
        if (localStorage.getItem('username')) {
            navigate('/sensor');
        }
    }, []);

    // Submit
    /*async function handleSubmit(event) {
        //Prevent page reload
        event.preventDefault();
        var raw = JSON.stringify({
            "username": username,
            "password": password,
        });

        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };

        const res = await fetch("login", requestOptions);
        const json = await res.json();
        if (json.result === "success") {
            localStorage.setItem('username', username);
            localStorage.setItem('type', json.message.type);
            setChangepage(true);
        }
        else {
            setErrorMessages(json.message);
        }
    };*/

    async function handleSubmit(event) {
        localStorage.setItem('username', username);
        localStorage.setItem('type', "user");
        setChangepage(true);
    }

    // Generate JSX code for error message
    var renderErrorMessage = <div></div>;
    if (errorMessages !== "") {
        renderErrorMessage = <div className='errormessage'>{errorMessages}</div>;
    }

    return (
        <div className='login'>
            <Header />
            <div className='login-content'>
                <h2>Login</h2>
                <img src={logo} alt="logo"></img>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" required placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                    <input type="password" name="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    <button type="submit" className="button-container">Log In</button>
                    {renderErrorMessage}
                </form>
            </div>
            <Dialog open={changepage}>
                <Navigate to='/sensor'/>
            </Dialog>
        </div>
    );
}

export default Login;