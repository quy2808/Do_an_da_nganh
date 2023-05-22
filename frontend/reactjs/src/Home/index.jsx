import './index.css';
import Header from '../Components/Header/Header';
import preview from './preview.jpg';

function Home(props) {

    return (
        <div className='homepage'>
            <Header />
            <div className='home-content'>
                <div className='left-content-header'>
                    <h2>SMARTPLANT HAS A NEW HOME</h2><br/>
                    <p>After a decade of helping beginner gardeners grow, we've joined forces with Iris
                    , a free gardening app built by the experts at Crocus. Discover all the same featur
                    es, and more on the completely free Iris app today.</p><br/>
                    <a href='/login'>Join now</a>
                </div>
                <div className='right-content-header'>
                    <img src={preview} alt="smart ai garden image"></img>
                </div>
            </div>
        </div>
    );
}

export default Home;