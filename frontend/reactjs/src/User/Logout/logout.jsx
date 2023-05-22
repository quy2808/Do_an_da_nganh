import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function Logout(props) {
    const navigate = useNavigate();
    localStorage.removeItem('username')
    localStorage.removeItem('type')
    
    useEffect(() => {
        navigate('/')
    }, []);

    return (
        <div></div>
    );
}

export default Logout;