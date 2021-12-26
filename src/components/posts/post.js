//import de react, useState, useEffect
import React, { useState, useEffect } from 'react';

//import des classes de bootstrap
import 'bootstrap';

//import Axios pour effectuer les requêtes
import Axios from 'axios';

//import du logo groupomania
import logo from '../icon-left-font-monochrome-black.png';

//import des react-components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

//composant React Posts (présentation des posts des utilisateurs)
function Posts() {

    /*requête Axios : récupération des posts de la base de données */
    useEffect(() => {
        Axios.get('http://localhost:4000/api/posts')
            .then((response) => {
                const data = response.data.result;
                console.log(data);
            })
    });
    return(
        <Container className="mt-5">
            <Card className="p-2" style={{ width: '25em' }}>
                <Card.Header className="d-flex flex-row justify-content-between">
                    <div>
                        <span>1</span>
                        <Badge className="rounded-circle mx-2">A</Badge>
                        <span>Author</span>
                    </div>
                    <span className="ms-5">26/12/2021</span>
                </Card.Header>
                <Card.Img variant="top" as={ Image } src={ logo } />
                <Card.Body>
                    <Card.Title>Title</Card.Title>
                    <Card.Text>
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex flex-row justify-content-around">
                    <Button variant="primary" className="rounded-pill me-2 btn-sm">
                        <i className="far fa-comments me-1"></i>
                        <Badge bg="secondary" className="rounded-circle">
                           9
                        </Badge>
                    </Button>
                    <Button variant="warning" className="rounded-pill px-3 me-2 btn-sm">
                        <i className="far fa-edit"></i>
                    </Button>
                    <Button variant="danger" className="rounded-pill px-3 btn-sm">
                        <i className="far fa-trash-alt"></i>
                    </Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default Posts ;