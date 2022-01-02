//import de react
import { useState } from "react";

//import des classes de bootstrap
import 'bootstrap';

//import Axios pour effectuer les requêtes
import Axios from 'axios';
//import des react-bootstrap components
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewPost() {
    const [title, setTitle] = useState();
    const [subject, setSubject] = useState();

    const postFormSubmit = (event) => {
        event.preventDefault();
        const postFormData = new FormData(document.getElementById("postForm"));
        Axios.defaults.headers['Authorization'] =`Bearer ${localStorage.getItem("token")}`;
        Axios.post("http://localhost:4000/api/posts", postFormData)
        .then((result) => {
            console.log(result);
            window.location.href = "posts";
        })
        .catch(error => console.log(error));
    };
    return(
        <Container>
            <Form id="postForm" className="border border-1 rounded-3 border-black py-2 px-3 mt-3" onSubmit={ postFormSubmit }>
                <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control name="title" id="title" type="text" placeholder="Entrez le titre ici" value={ title } onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contenu</Form.Label>
                    <Form.Control name="subject" id="subject" type="text" placeholder="Entrez le contenu ici" value={ subject } onChange={(e) => setSubject(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control name="image" id="image" type="file" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Soumettre
                </Button>
            </Form>
        </Container>
    )
};

export default NewPost;