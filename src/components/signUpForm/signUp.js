import React, {useState} from "react";
import Axios from 'axios';
import 'bootstrap';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isLogged = localStorage.token ;

  /*onSubmit du formulaire au serveur*/
  const Register = (event) => {
    event.preventDefault();
    Axios.post("http://localhost:4000/api/auth/signup", {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password})
    .then(() => {
      window.location.href ="login";
    })
  };
  
  if(!isLogged) {
    return (
      <form className="text-center border border-1 rounded-3 p-3 mt-5 bg-light shadow">
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">Prénom :</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
            <input className="form-control" type="text" name="firstName" id="firstName" value={ firstName } onChange={(e) => setFirstName(e.target.value)}/>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">Nom :</label>
          <div className="input-group mb-3">
            <span className="input-group-text"><i className="fas fa-user"></i></span>
            <input className="form-control" type="text" name="lastName" id="lastName" value={ lastName } onChange={(e) => setLastName(e.target.value)}/>
          </div>
        </div>
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
        <input onClick={Register} className="btn btn-success rounded-pill px-5" value="S'inscrire" type="submit"/>
      </form>
    )
  } else {
    window.location.href = "posts";
  }
  
};

export default SignUp;