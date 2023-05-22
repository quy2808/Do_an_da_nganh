import { useEffect, useState } from "react";
import { LineChart ,  XAxis, YAxis, Line, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useNavigate } from 'react-router-dom';
import "./sensor.css";
import cloneDeep from 'lodash/cloneDeep';
import Header from "../../Components/Header/Header";

function Sensor(props) {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'));
        }
        else {
            navigate('/login');
        }
    }, [navigate]);

    const [filterDate, setFilterDate] = useState("");
    
    function handle(e) {
        setFilterDate(e.target.value);
    }

    const [temp, setTemp] = useState([]);
    const [light, setLight] = useState([]);
    const [humid, setHumid] = useState([]);
    const [earth, setEarth] = useState([]);

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
                    func(response.reverse());
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
    } , [username, navigate])

    const type = ["light", "temp", "humid", "earth"];
    var chart = type.map((typ, index) => {
        var title = "";
        var domain = [];
        var data;
        if (typ === "temp") {
            title = "Temperature";
            domain = [10, 50];
            data = cloneDeep(temp);
            data = data.filter((element) => {
                return (element.created_at.includes(filterDate));
            });
        }
        else if (typ === "humid") {
            title = "Humid";
            domain = [0, 60];
            data = cloneDeep(humid);
            data = data.filter((element) => {
                return (element.created_at.includes(filterDate));
            });
        }
        else if (typ === "light") {
            title = "Light";
            domain = [0, 100];
            data = cloneDeep(light);
            data = data.filter((element) => {
                return (element.created_at.includes(filterDate));
            });
        }
        else if (typ === "earth") {
            title = "Earth Humid";
            domain = [0, 100];
            data = cloneDeep(earth);
            data = data.filter((element) => {
                return (element.created_at.includes(filterDate));
            });
        }
        
        data = data.map((element) => {
            if (filterDate) element.created_at = element.created_at.substring(11, 19);
            return element;
        });

        return (
        <div className="sensor-menu" key={index}>
            <h1>{title}</h1>
            <ResponsiveContainer>
                <LineChart data={data} className="chart-data">
                    <CartesianGrid strokeDasharray="3 3" vertical fill="white" fillOpacity={0.6}/>
                    <XAxis dataKey="created_at"/>
                    <YAxis domain={domain}/>
                    <Tooltip />
                    <Legend />
                    <Line dataKey="value" fill="#8884d8" />
                </LineChart >
            </ResponsiveContainer>
        </div>
        );
    })

    return (
        <div className="sensor">
            <Header/>
            <h1>Sensor</h1>
            <div className="filter-time">
                <form id='select-date-time'>
                    <input type='date' onChange={(e) => handle(e)}/>
                    <input type='reset' onClick={() => setFilterDate("")} value="All day"/>
                </form>
            </div>
            {chart}
        </div>
    );
}

export default Sensor;