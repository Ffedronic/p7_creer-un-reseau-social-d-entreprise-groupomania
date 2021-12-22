import React, {useState} from "react";
import 'bootstrap';
import Axios from 'axios';

function Login() {
  
  /*Création des useStates email et password*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*vérification du log de l'utilisateur*/
  const isLogged = localStorage.token;

  /*onSubmit du formulaire au serveur*/
  const login = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/api/auth/login", {
    email: email,
    password: password
    })
    .then((response) => {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("isAdmin", response.data.isAdmin);
      window.location.href = "posts";
    })
  };
  if(!isLogged) {
    return (
      <form onSubmit={login} className="text-center border border-1 rounded-3 p-3 mt-5 bg-light shadow">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email :</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-at"></i></span>
            <input className="form-control" type="email" name="email" id="email" value={ email } onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Mot de passe :</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-key"></i></span>
            <input className="form-control" type="password" name="password" id="password" value={ password } onChange={(e) => setPassword(e.target.value)}/>
          </div>
        </div>
        <div id="errorMessage"></div>
        <input className="btn btn-success rounded-pill px-5" value="Se Connecter" type="submit"/>
      </form>
    )
  } else {
    window.location.href = "posts";
  }
};

export default Login;