//import de react, useState, useEffect
import React from 'react';

//import des classes de bootstrap
import 'bootstrap';

//import axios
import Axios from 'axios';

//import des react-components
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

function Post (props) {
    return (
        <Card className="p-2" style={{ width: '15em' }}>
            <Card.Header className="d-flex flex-row justify-content-between">
                <div>
                    <span>{ props.id }</span>
                    <Badge className="rounded-circle mx-2">{ props.author }</Badge>
                </div>
                <span className="ms-5">{ props.date }</span>
            </Card.Header>
            <Card.Img variant="top" as={ Image } src={ props.imgUrl } />
            <Card.Body>
                <Card.Title>{ props.title }</Card.Title>
                <Card.Text>{ props.subject }</Card.Text>
            </Card.Body>
            <Card.Footer className="d-flex flex-row justify-content-around">
                <Button variant="primary" className="rounded-pill me-2 btn-sm">
                    <i className="far fa-comments me-1"></i>
                    <Badge bg="secondary" className="rounded-circle">{ props.sumComments }</Badge>
                </Button>
                <Button variant="warning" className="rounded-pill px-3 me-2 btn-sm">
                    <i className="far fa-edit"></i>
                </Button>
                <Button variant="danger" className="rounded-pill px-3 btn-sm">
                    <i className="far fa-trash-alt"></i>
                </Button>
            </Card.Footer>        
        </Card>
    ) 
}

function Posts() {
    var listToDisplay="" ;
    Axios.get('http://localhost:4000/api/posts')
    .then((response) =>{
        listToDisplay = response.data.result.map((post) => <Post id={post.id}/>);
        console.log(listToDisplay);
    })
    return(
        <div>
            {listToDisplay}
        </div>
    )
}
export default Posts ;