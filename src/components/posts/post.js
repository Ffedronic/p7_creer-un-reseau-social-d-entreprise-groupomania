import { useState, useEffect } from "react";

//import des classes de bootstrap
import 'bootstrap';

//import axios
import Axios from 'axios';

//import des react-components
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

function Post (props) {
    const isAuthor = props.isAuthor ;
    if(isAuthor) {
        return (
            <Card className="m-2 card">
                <Card.Header className="d-flex flex-row justify-content-between">
                    <div>
                        <span className="d-none">{ props.id }</span>
                        <span className="text-uppercase fw-bold">{ props.author }</span>
                        <span className="d-none" id="authorId">{ props.authorId}</span>
                    </div>
                    <span className="ms-5">{ props.date }</span>
                </Card.Header>
                <Card.Img variant="top" as={ Image } src={ props.imgUrl } thumbnail />
                <Card.Body>
                    <Card.Title>{ props.title }</Card.Title>
                    <Card.Text>{ props.subject }</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex flex-row justify-content-around">
                    <Button variant="primary" className="rounded-pill me-2 btn-sm">
                        <i className="far fa-comments me-1"></i>
                        <span className="d-none d-md-inline">Commenter</span>
                    </Button>
                    <Button variant="warning" className="rounded-pill px-3 me-2 btn-sm" id="modifyPostButton">
                        <i className="fas fa-eye me-1"></i>
                        <span className="d-none d-md-inline">Voir</span>
                    </Button>
                    <Button variant="primary" className="rounded-pill me-2 btn-sm">
                        <i className="far fa-edit me-1"></i>
                        <span className="d-none d-md-inline">Modifier</span>
                    </Button>
                    <Button variant="danger" className="rounded-pill px-3 btn-sm" id="DeletePostButton">
                        <i className="far fa-trash-alt"></i>
                        <span className="d-none d-md-inline">Supprimer</span>
                    </Button>
                </Card.Footer>        
            </Card>
        )    
    }
    return (
        <Card className="m-2 card">
            <Card.Header className="d-flex flex-row justify-content-between">
                <div>
                    <span className="d-none">{ props.id }</span>
                    <span className="text-uppercase fw-bold">{ props.author }</span>
                    <span className="d-none" id="authorId">{ props.authorId}</span>
                </div>
                <span className="ms-5">{ props.date }</span>
            </Card.Header>
            <Card.Img variant="top" as={ Image } src={ props.imgUrl } thumbnail />
            <Card.Body>
                <Card.Title>{ props.title }</Card.Title>
                <Card.Text>{ props.subject }</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-around">
                <Button variant="primary" className="rounded-pill me-2 btn-sm">
                    <i className="far fa-comments me-1"></i>
                    <span className="d-none d-md-inline">Commenter</span>
                </Button>
                <Button variant="warning" className="rounded-pill px-3 me-2 btn-sm" id="modifyPostButton">
                    <i className="fas fa-eye me-1"></i>
                    <span className="d-none d-md-inline">Voir</span>
                </Button>
            </Card.Footer>        
        </Card>
    ) 
}

function Posts() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        Axios.get('http://localhost:4000/api/posts')
    .then((response) =>{
        setItems(response.data.result);
    })
    .catch(error => console.log(error));
    }, []);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const isLogged = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin");
    console.log(isAdmin);
    if(!isLogged) {
        window.location.href = "connexion";
    } else {
        if(isAdmin > 0) {
            return(
                <Container className="d-flex flex-wrap justify-content-center mt-5">
                    { items.map((post) => 
                    <Post 
                        key={post.id}
                        id={post.id}
                        isAuthor={ true }
                        author={post.authorFirstName}
                        authorId={post.author}
                        date={ new Date(post.date).toLocaleDateString("fr-FR", options)}
                        title={ post.title }
                        subject={post.subject}
                        imgUrl={post.img_url}
                        sumComments={post.author}
                        />
                    )}
                </Container>
            )    
        }
        return(
            <Container className="d-flex flex-wrap justify-content-center mt-5">
                { items.map((post) => 
                <Post 
                    key={post.id}
                    id={post.id}
                    isAuthor={ false }
                    author={post.authorFirstName}
                    authorId={post.author}
                    date={ new Date(post.date).toLocaleDateString("fr-FR", options)}
                    title={ post.title }
                    subject={post.subject}
                    imgUrl={post.img_url}
                    sumComments={post.author}
                    />
                )}
            </Container>
        )
    }
}
export default Posts ;