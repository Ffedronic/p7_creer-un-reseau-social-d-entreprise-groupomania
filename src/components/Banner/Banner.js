import 'bootstrap';
import logo from '../icon-left-font-monochrome-black.png';
import { Outlet, Link } from "react-router-dom";

function Banner() {
  const isLogged = localStorage.token;
  const isLogOut = () => {
    localStorage.clear();
    window.location.href = "login";
  }
  if(!isLogged) {
    return (
      <div className="text-center" id="banner">
        <img src={ logo } alt="logo" width="400px"/> 
        <ul className="list-unstyled"> 
          <li className="my-5">
            <Link className="h1 text-decoration-none border border-1 px-5 py-2 bg-info text-dark rounded-pill" to="/signUp">Inscription</Link>
          </li>
          <li className="mb-5">
            <Link className="h1 text-decoration-none border border-1 px-5 py-2 bg-success text-dark rounded-pill" to="/login">Connexion</Link>
          </li>
        </ul>
        <Outlet/>
      </div>
    )
  } else {
    return (
      <div className="text-center" id="banner">
        <img src={ logo } alt="logo" width="400px"/>  
         <ul className="list-unstyled">
         <li className="mb-5">
            <Link className="h6 text-decoration-none border border-1 px-5 py-2 bg-success text-dark rounded-pill" to="/monProfil">Mon Profil</Link>
          </li> 
          <li className="mb-5">
            <Link onClick={isLogOut} className="h6 text-decoration-none border border-1 px-5 py-2 bg-success text-dark rounded-pill" to="/">Déconnexion</Link>
          </li>
        </ul>
        <Outlet/>
      </div> 
    )
  }
}

export default Banner;
