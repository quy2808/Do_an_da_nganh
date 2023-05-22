import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import Login from './Client/Login/login';

import Sensor from './User/Sensor/sensor';
import AI from './User/AI/ai';
import Planting from './User/Planting/planting';
import EditProfile from './User/EditProfile/editprofile';

import Home from './Home/index';
import Logout from './User/Logout/logout';
import Report from './User/Report/report';

import NotFound from './NotFound/NotFound';


function App() {
  // const [cookies, setCookie] = useCookies(['username', 'type']);
  console.log(localStorage.getItem('type'))

  return (
    <div className="App">
      <Router>
            <Routes>
              <Route path='/login' element={< Login/>} />

              <Route path='/sensor' element={< Sensor/> } />
              <Route path='/ai' element={< AI/> } />
              <Route path='/planting' element={< Planting/> } />
              <Route path='/edit' element={< EditProfile/>} />
              <Route path='/report' element={< Report/>} />

              <Route path='/' element={< Home/>} />
              <Route path='/logout' element={< Logout/>} />

              <Route path='*' element = {<NotFound />} />

            </Routes>
          </Router>
    </div>
  );
}

export default App;
