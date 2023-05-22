import Table from 'react-bootstrap/Table';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { WiThermometer, WiHumidity, WiDaySunny} from 'react-icons/wi'
import { FaRegLightbulb, FaPumpMedical, FaFan} from 'react-icons/fa'

import "./planting.css";
import Header from "../../Components/Header/Header";

function Planting(props) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [typeMess, setTypeMess] = useState('info');

    const [temp, setTemp] = useState({value: 0});
    const [light, setLight] = useState({value: 0});
    const [humid, setHumid] = useState({value: 0});
    const [earth, setEarth] = useState({value: 0});

    useEffect(() => {
        async function getData(link, func) { 
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            try {
                const res = await fetch(link, requestOptions);
                const response = await res.json();
                if ( !response.error ) {
                    func(response[0]);
                }
            }
            catch {
                navigate('/error');
            }
        }
        getData("https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/doamkhongkhi/data", setHumid);
        getData("https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/anhsang/data", setLight);
        getData("https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/nhietdo/data", setTemp);
        getData("https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/doamdat/data", setEarth);
    } , [navigate])

    const handleClose = () => {
        setOpen(false);
    };

    async function pushAction(sensor_id, value) {
        let content = "!" + String(sensor_id) + ":" + String(value) + "#";
        var raw = JSON.stringify({
            "datum": {"value": content}
        });
        var requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: raw,
            redirect: 'follow'
        };
        try {
            const res = await fetch("https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/canhbao/data?X-AIO-Key=aio_fuaC55KGa7zgLYReO4Cqn3XzJzRa", requestOptions);
            const response = await res.json();
            if ( response.error ) {
                setMessage(response.error);
                setTypeMess("error");
            }
            else {
                if (value === 1) {
                    setMessage("Turn ON.");
                }
                else {
                    setMessage("Turn OFF.");
                }
                setTypeMess("info");
            }
            setOpen(true);
        }
        catch {
            navigate('/error');
        }
    }

    return (
        <div className="planting">
            <Header/>
            <h1>Curent data environment</h1>
            <Table className='planting_value'>
                <thead>
                    <tr>
                        <td>Temperature</td>
                        <td>Humidity</td>
                        <td>Light</td>
                        <td>Earth humidity</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><div id='temp_value'><WiThermometer />{temp.value}*C</div></td>
                        <td><div id='humid_value'><WiHumidity />{humid.value}%</div></td>
                        <td><div id='light_value'><WiDaySunny />{light.value}lx</div></td>
                        <td><div id='earth_value'><WiHumidity />{earth.value}%</div></td>
                    </tr>
                </tbody>
            </Table>
            <h1>Action</h1>
            <Table className='planting_controller'>
                <tbody>
                    
                    <tr>
                        <td><FaRegLightbulb />LIGHT</td>
                        <td><button onClick={() => pushAction(5,1)}>ON</button></td>
                        <td><button onClick={() => pushAction(5,0)}>OFF</button></td>
                    </tr>
                    <tr>
                        <td><FaPumpMedical />PUMP</td>
                        <td><button onClick={() => pushAction(6,1)}>ON</button></td>
                        <td><button onClick={() => pushAction(6,0)}>OFF</button></td>
                    </tr>
                    <tr>
                        <td><FaFan />FAN</td>
                        <td><button onClick={() => pushAction(7,1)}>ON</button></td>
                        <td><button onClick={() => pushAction(7,0)}>OFF</button></td>
                    </tr>
                </tbody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <Alert severity={typeMess}>
                    {message}
                </Alert>
            </Dialog>
        </div>
    );
}

export default Planting;
