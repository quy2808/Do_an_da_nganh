import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ai.css";
import cloneDeep from 'lodash/cloneDeep';
import Table from 'react-bootstrap/Table';
import Header from "../../Components/Header/Header";

function AI(props) {
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

    const [data, setData] = useState([]);
    const [filterDate, setFilterDate] = useState("");

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
        getData("https://io.adafruit.com/api/v2/thonghuynhthanh/feeds/batthuong/data", setData);
    } , [username, navigate]);

    var filter_data = cloneDeep(data.reverse());
    filter_data = filter_data.filter((element) => {
        return element.value.includes(filterDate);
    })

    var chart = filter_data.map((element, index) => {
        let value = element.value.slice(1,-1).split(";");
        let day = value[0].slice(9, 19);
        let timedate = value[0].slice(20, 28);
        let temp = "";
        let light = "";
        let humid = "";
        let earth = "";
        for (let i = 1; i < 4; i+=1) {
            if (value[i].includes("temp")) {
                temp = value[i].slice(5);
            } else if (value[i].includes("light")) {
                light = value[i].slice(6);
            } else if (value[i].includes("khongkhi")) {
                humid = value[i].slice(13);
            } else if (value[i].includes("dat")) {
                earth = value[i].slice(8);
            }
        }
        return (
            <tr key={index}>
                <td>
                    {day}
                </td>
                <td>
                    {timedate}
                </td>
                <td className="abnormal-value">
                    {light}
                </td>
                <td className="abnormal-value">
                    {temp}
                </td>
                <td className="abnormal-value">
                    {humid}
                </td>
                <td className="abnormal-value">
                    {earth}
                </td>
            </tr>
        );
    })

    return (
        <div className="ai">
            <Header/>
            <h1>AI Check Abnormal</h1>
            <div className="filter-time">
                <form id='select-date-time'>
                    <input type='date' onChange={(e) => setFilterDate(e.target.value)}/>
                    <input type='reset' onClick={() => setFilterDate("")} value="All day"/>
                </form>
            </div>
            <Table id="abnormal-table">
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Time</td>
                        <td>Light</td>
                        <td>Temp</td>
                        <td>Humid</td>
                        <td>Earth hum</td>
                    </tr>
                </thead>
                <tbody>
                    {chart}
                </tbody>
            </Table>
        </div>
    );
}

export default AI;