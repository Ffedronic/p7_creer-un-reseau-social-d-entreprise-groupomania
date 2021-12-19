import React, {useState} from "react";
import 'bootstrap';

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  return (
    <form className="text-center border border-1 rounded-3 p-3 mt-5 bg-light shadow">
      <h1 className="mb-3 border-bottom border-1 border-secondary pb-2 fw-bold">Inscription</h1>
      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">Prénom :</label>
        <div className="input-group mb-3">
          <span className="input-group-text"><i class="fas fa-user"></i></span>
          <input className="form-control" type="text" name="firstName" id="firstName" value={ firstName } onChange={(e) => setFirstName(e.target.value)}/>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Nom :</label>
        <div className="input-group mb-3">
          <span className="input-group-text"><i class="fas fa-user"></i></span>
          <input className="form-control" type="text" name="lastName" id="lastName" value={ lastName } onChange={(e) => setLastName(e.target.value)}/>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email :</label>
        <div className="input-group mb-3">
          <span className="input-group-text"><i class="fas fa-at"></i></span>
          <input className="form-control" type="email" name="email" id="email" value={ email } onChange={(e) => setEmail(e.target.value)}/>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Mot de passe :</label>
        <div className="input-group mb-3">
          <span className="input-group-text"><i class="fas fa-key"></i></span>
          <input className="form-control" type="password" name="password" id="password" value={ password } onChange={(e) => setPassword(e.target.value)}/>
        </div>
      </div>
      <div id="errorMessage"></div>
      <input className="btn btn-success rounded-pill px-5" value="S'inscrire" type="submit"/>
    </form>
  )
};

export default SignUp;