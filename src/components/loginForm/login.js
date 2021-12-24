//import de react
import React, {useState} from "react";

//import des classes de bootstrap
import 'bootstrap';

//import Axios pour effectuer les requêtes
import Axios from 'axios';

//import des react-bootstrap components
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

//composant React Login servant à se logger
function Login() {
  
  /*Création des useStates email et password*/
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /*vérification du log de l'utilisateur*/
  const isLogged = localStorage.token;

  /*requête Login : connexion de l'utilisateur, enregistrement dans le localStorage du token et de l'isAdmin, redirection vers la page des posts*/
  const Login = (event) => {
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
    
  /*si l'utilisateur n'est pas connecté,*/
  if(!isLogged) {
    return (
      /*formulaire de connexion avec les react-bootstrap components*/      
      <Container>
        <Form onSubmit={ Login } className="border border-1 p-3 rounded-3 shadow bg-light mt-5">
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

export default Login;