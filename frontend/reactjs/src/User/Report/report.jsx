
import "./report.css";
import Table from 'react-bootstrap/Table';
import Header from "../../Components/Header/Header";

function Report(props) {
    
    // const response = ([
    //         (datetime.datetime(2023, 5, 13, 9, 26, 30), 24.19, 37.56, 32.84, 25.4), 
    //         (datetime.datetime(2023, 5, 13, 9, 26, 30), 24.19, 37.56, 32.84, 25.4), 
    //         (datetime.datetime(2023, 5, 13, 9, 26, 30), 24.19, 37.56, 32.84, 25.4)],
    //         []
    //     );
    return (
        <div className="ai">
            <Header/>
            <h1>Report</h1>
            <Table>
                
            </Table>
        </div>
    );
}

export default Report;