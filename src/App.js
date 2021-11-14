import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Routes, Route, Link, Outlet } from "react-router-dom";
// import logo from './logo.svg';
import './App.css';
import Home from './home/Home';

function App() {
  return (
    <div className="App">
      {/* <h1>Welcome to React Router!</h1> */}
      <Navbar fixed="top" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">MGallery</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link href="/">Home</Nav.Link> */}
              {/* <Nav.Link href="/movies">Movie</Nav.Link> */}
              {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default App;
