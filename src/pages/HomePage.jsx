import { Navbar, Nav } from 'react-bootstrap';

const HomePage = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">FeyyFit</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link href="#profile">Profile</Nav.Link>
                        <Nav.Link href="#settings">Settings</Nav.Link>
                        <Nav.Link href="#logout">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <div className="container mt-3">
                <h2 className="text-center">Welcome to FeyyFit!</h2>
            </div>
        </div>
    );
};

export default HomePage;
