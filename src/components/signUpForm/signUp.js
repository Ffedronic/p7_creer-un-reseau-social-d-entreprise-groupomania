//import de react
import React, {useState} from "react";
//import Axios pour effectuer les requêtes
import Axios from 'axios';
//import des classes de bootstrap
import 'bootstrap';
//import des react-bootstrap components
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

//composant SignUp servant à s'inscrire
function SignUp() {

  /*déclaration des useState email, password, firstName, lastName*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  /*récupération du status log de l'utilisateur*/
  const isLogged = localStorage.token ;

  /*requête Register : enregistrement de l'utilisateur et redirection vers la page de connexion*/
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

  /*si l'utilisateur n'est pas connecté*/
  if(!isLogged) {
    return (
      /*formulaire d'inscription avec les react-bootstrap components*/      
      <Container>
        <Form onSubmit={ Register } className="border border-1 p-3 rounded-3 shadow bg-light mt-5">
          <Form.Group className="mb-3" controlId="firstName">
            <Form.Label className="fw-bold">Prénom :</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="fas fa-user"></i></InputGroup.Text>
              <Form.Control type="text" name="firstName" value={ firstName } onChange={(e) => setFirstName(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastName">
            <Form.Label className="fw-bold">Nom :</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="far fa-user"></i></InputGroup.Text>
              <Form.Control type="text" name="lastName" value={ lastName } onChange={(e) => setLastName(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="fw-bold">Email :</Form.Label>
            <InputGroup>
              <InputGroup.Text><i className="fas fa-at"></i></InputGroup.Text>
              <Form.Control type="email" name="email" value={ email } onChange={(e) => setEmail(e.target.value)} placeholder="exemple@groupomania.com" />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="fw-bold">Mot de passe :</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text><i className="fas fa-lock"></i></InputGroup.Text>
              <Form.Control type="password" name="password" value={ password } onChange={(e) => setPassword(e.target.value)} placeholder="entrez votre mot de passe" />
            </InputGroup>
            <Form.Text className="text-muted"><i className="fas fa-exclamation-circle me-1"></i>Votre mot passe doit contenir au minimum 8 caractères, 1 lettre majuscule, 1 lettre minuscule, 2 chiffres, et <span className="text-decoration-underline">pas de symboles.</span></Form.Text>
          </Form.Group>
          <Button variant="success" type="submit"><i className="fas fa-check-circle me-3"></i>Envoyer</Button>
        </Form>
      </Container>
    )
  } else {
    /*si l'utilisateur est connecté, on le redirige vers la page des posts*/
    window.location.href = "posts";
  }
  
};

export default SignUp;