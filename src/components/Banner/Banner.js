//import des classes de bootstrap
import 'bootstrap';

//import du logo groupomania
import logo from '../icon-left-font-monochrome-black.png';

//import du Outlet
import { Outlet } from "react-router-dom";

//import des react-bootstrap components
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


//composant React Banner correspondant à la barre de navigation
function Banner() {

  /*vérification du log de l'utilisateur*/
  const isLogged = localStorage.getItem("token");
  const profilHref = `/profil/${Number(localStorage.getItem("userId"))}`;
  
  /*déconnexion de l'utilisateur en vidant le localStorage (token, isAdmin)*/
  const isLogOut = () => {
    localStorage.clear();
  }

  /*si l'utilisateur n'est pas connecté,*/
  if(!isLogged) {
    return (
      /*barre de navigation avec les react-bootstrap components*/
      <div>
        <Navbar bg="light" expand="md" variant="light">
          <Container>
            <Navbar.Brand href="#0">
              <img
                alt=""
                src= { logo }
                width="275"
                height="70"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-center justify-content-md-end" id="basic-navbar-nav">
              <Nav.Item className="btn btn-info btn-sm rounded-pill p-0 me-3">
                <Nav.Link className="text-white" href="/inscription"><i className="fas fa-user-plus me-3"></i>Inscription</Nav.Link>
              </Nav.Item>
              <Nav.Item className="btn btn-success btn-sm rounded-pill p-0">
                <Nav.Link className="text-white" href="/connexion"><i className="fas fa-sign-in-alt me-3"></i>Connexion</Nav.Link>
              </Nav.Item>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Outlet/>
      </div>
    )
  } else {
    /*si l'utilisateur est connecté,*/
    return (
      /*barre de navigation avec les react-bootstrap components*/
      <div>
        <Navbar bg="light" expand="md" variant="light">
          <Container>
            <Navbar.Brand href="/posts">
              <img
                alt=""
                src= { logo }
                width="275"
                height="70"
                className="d-inline-block align-top"
              />{' '}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
              <Nav.Item className="btn btn-primary btn-sm rounded-pill p-0 me-3">
                <Nav.Link className="text-white" href={ profilHref }><i className="far fa-id-card me-2"></i>Profil</Nav.Link>
              </Nav.Item>
              <Nav.Item className="btn btn-warning btn-sm rounded-pill p-0 me-3">
                <Nav.Link className="text-white" href="/nouveauPost"><i className="far fa-envelope me-2"></i>Ajouter un sujet</Nav.Link>
              </Nav.Item>
              <Nav.Item className="btn btn-success btn-sm rounded-pill p-0">
                <Nav.Link onClick={ isLogOut } className="text-white" href="/connexion"><i className="fas fa-sign-out-alt me-2"></i>Déconnexion</Nav.Link>
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
