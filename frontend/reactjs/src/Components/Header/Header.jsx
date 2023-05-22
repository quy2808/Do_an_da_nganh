import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { RiPlantLine } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import './header.css';

function Header(props) {
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (localStorage.getItem('username')) {
            setUsername(localStorage.getItem('username'))
        }
    }, []);

    const expand="false";
    return (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3 head">
            <Container fluid>
                <Navbar.Brand href="/"><RiPlantLine /> SMART GARDEN</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-$ {expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                        <RiPlantLine />SMART GARDEN
                    </Offcanvas.Title>
                </Offcanvas.Header>
                    { username?
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link href="/ai">AI</Nav.Link>
                            <Nav.Link href="/sensor">Sensor</Nav.Link>
                            <Nav.Link href="/report">Report</Nav.Link>
                            <Nav.Link href="/planting">Planting</Nav.Link>
                            <NavDropdown
                                title="User"
                                id={`offcanvasNavbarDropdown-expand-${expand}`}
                            >
                                <NavDropdown.Item href="/edit">Help</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/logout">Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Offcanvas.Body>: <></>
                    }
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Header;
