import './editprofile.css'
import { useEffect, useState } from "react"
import Header from "../../Components/Header/Header";
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';


function EditProfile(props) {
    const [fullname, setFullname] = useState("thanh binh");
    const [email, setEmail] = useState("abc@email.com");
    const [phone, setPhone] = useState("0123456789");
    
    const [username, setUsername] = useState(localStorage.getItem('username'));
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'));
        }
        else {
            navigate('/login');
        }
    }, [navigate]);

    /*useEffect(() => {
        async function getUser() {
            var url = "link" + String(username);
    
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            const res = await fetch(url, requestOptions);
            const response = await res.json();

            setFullname(response.message.name);
            setEmail(response.message.email);
            setPhone(response.message.phone);
        }
        getUser();
    } , [])*/

    return (
        <div>
            <Header />
            <div className='editprofile' >
                <h1>Technical Assistance</h1>
                <form onSubmit="">
                    <Table className="editprofile-table" style={{textAlign: "left"}}>
                        <tbody>
                            <tr>
                                <td>
                                    <label>Username</label><br/>
                                    <input type="text" id="fname" name="fname" value={username} disabled/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Name</label><br/>
                                    <input type="text" id="fullname" name="fullname" value={fullname} disabled/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Email</label><br/>
                                    <input type="email" id="email" name="email" value={email} disabled/>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Phone number</label><br/>
                                    <input type="text" id="phone" name="phone" value={phone} disabled/>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </form>
            </div>
            {/* <Dialog  open={changepage}>
                <Navigate to='/user/edit'/>
            </Dialog> */}
        </div>
    );
}

export default EditProfile;