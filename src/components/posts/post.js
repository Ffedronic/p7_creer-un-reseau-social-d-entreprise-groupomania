import { useState } from "react";

//import des classes de bootstrap
import 'bootstrap';

//import axios
import Axios from 'axios';

//import des react-components
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

function Post (props) {
    return (
        <Card className="m-2">
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
                    <i className="far fa-comments me-1"></i>Commentaires
                    <Badge bg="secondary" className="rounded-circle">{ props.sumComments }</Badge>
                </Button>
                <Button variant="warning" className="rounded-pill px-3 me-2 btn-sm" id="modifyPostButton">
                    <i className="far fa-edit"></i>
                </Button>
                <Button variant="danger" className="rounded-pill px-3 btn-sm" id="DeletePostButton">
                    <i className="far fa-trash-alt"></i>
                </Button>
            </Card.Footer>        
        </Card>
    ) 
}

function Posts() {
    const [items, setItems] = useState([]);
    Axios.get('http://localhost:4000/api/posts')
    .then((response) =>{
        setItems(response.data.result);
    })
    .catch(error => console.log(error));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return(
        <Container className="d-flex flex-wrap justify-content-center mt-5">
            { items.map((post) => 
            <Post 
                key={post.id}
                id={post.id}
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
export default Posts ;