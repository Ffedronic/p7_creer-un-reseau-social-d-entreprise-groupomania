import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import 'bootstrap';
import logo from '../icon-left-font-monochrome-black.png';
import { Outlet } from "react-router-dom";

function Banner() {
  const isLogged = localStorage.token;
  const isLogOut = () => {
    localStorage.clear();
  }
  if(!isLogged) {
    return (
      <div>
        <Navbar bg="light" expand="md" variant="light">
          <Container>
            <Navbar.Brand href="#0">
              <img
                alt=""
                src= { logo }
                width="250"
                height="55"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-center justify-content-md-end" id="basic-navbar-nav">
              <Nav.Item className="btn btn-info rounded-pill p-0 me-3">
                <Nav.Link className="text-white" href="/inscription"><i className="fas fa-user-plus me-3"></i>Inscription</Nav.Link>
              </Nav.Item>
              <Nav.Item className="btn btn-success rounded-pill p-0">
                <Nav.Link className="text-white" href="/connexion"><i className="fas fa-sign-in-alt me-3"></i>Connexion</Nav.Link>
              </Nav.Item>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar bg="light" expand="md" variant="light">
          <Container>
            <Navbar.Brand href="#0">
              <img
                alt=""
                src= { logo }
                width="250"
                height="55"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Nav.Item className="btn btn-info rounded-pill p-0 me-3">
                <Nav.Link className="text-white" href="/profil">Mon Profil</Nav.Link>
              </Nav.Item>
              <Nav.Item className="btn btn-success rounded-pill p-0">
                <Nav.Link onClick={ isLogOut } className="text-white" href="/connexion">Déconnexion</Nav.Link>
              </Nav.Item>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
      </div> 
    )
  }
}

export default Banner;
