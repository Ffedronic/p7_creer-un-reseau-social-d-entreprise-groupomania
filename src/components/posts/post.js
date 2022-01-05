/**
 * ! import du useState et useEffect
 */
import { useState, useEffect } from "react";

/**
 * ! import des classes boostrap
 */
import 'bootstrap';

/**
 * ! import Axios
 */
import Axios from 'axios';

/**
 * ! import des react-boostrap components
 */
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';

/**
 * ! Card component affichant un post
 */
function Post (props) {
    
    
    /**
     * * Création du useState pour l'affichage du modal de visualisation du post
    */
     const [showModal, setShowModal] = useState(false);
    
    /**
     * * Création des fonctions pour ouvrir et fermer le modal de visualisation du post
    */
     const handleCloseModal = () => setShowModal(false);
     const handleShowModal = () => setShowModal(true);

    /**
     * * Création des useStates pour l'affichage du modal de modification
    */
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [title, setTitle] = useState(`${props.title}`);
    const [subject, setSubject] = useState(`${props.subject}`);
    
    /**
     * * Création des fonctions pour ouvrir et fermer le modal de modification
    */
    const handleCloseModifyModal = () => setShowModifyModal(false);
    const handleShowModifyModal = () => setShowModifyModal(true);
    
    /**
     * * Création de la fonction d'envoi de la modification du post
    */
    const modifyOnePost = (event) => {
        event.preventDefault();
        const modifyFormData = new FormData(document.getElementById("postForm"));
        Axios.defaults.headers['Authorization'] =`Bearer ${localStorage.getItem("token")} ${localStorage.getItem("isAdmin")}`;
        Axios.put(`http://localhost:4000/api/posts/${props.id}`, modifyFormData)
        .then((result) => {
            console.log(result);
            window.location.href = "posts";
        })
        .catch(error => console.log(error));
    };

     /**
     * * Création de la fonction de suppression du post
     */
    const deletePost = (event) => {
        event.preventDefault();
        Axios.defaults.headers['Authorization'] =`Bearer ${localStorage.getItem("token")} ${localStorage.getItem("isAdmin")}`;
        Axios.delete(`http://localhost:4000/api/posts/${props.id}`)
        .then((result) => {
            console.log(result);
            window.location.href = "posts";
        })
        .catch(error => console.log(error));
    };
    
     /**
     * ? Si l'utilisateur est auteur du post
     */
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
                    {/*logique pour la visualisation du post avec ses commentaires*/}
                    <Button variant="warning" className="rounded-pill px-3 me-md-2 btn-sm" onClick={ handleShowModal }>
                        <i className="fas fa-eye"></i>
                        <span className="d-none d-md-inline ms-md-1">Voir</span>
                    </Button>
                    <Modal fullscreen show={ showModal } onHide={ handleCloseModal }>
                        <Modal.Header closeButton>
                        <Modal.Title>{ props.title }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Card>
                            <Card.Img variant="top" as={ Image } src={ props.imgUrl } thumbnail />
                            <Card.Body>
                                <Card.Title>{ props.title }</Card.Title>
                                <Card.Text>{ props.subject }</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Commentaires</Accordion.Header>
                                        <Accordion.Body>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                        est laborum.
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Footer>
                          </Card>
                        </Modal.Body>
                        <Modal.Footer>
                            <span className="text-capitalize">créé par {props.author}, le { props.date }</span>
                        </Modal.Footer>
                    </Modal>
                    {/*logique pour la modification du post */}
                    <Button onClick={ handleShowModifyModal } variant="primary" className="rounded-pill px-3 me-md-2 btn-sm">
                        <i className="far fa-edit"></i>
                        <span className="d-none d-md-inline ms-md-1">Modifier</span>
                    </Button>
                    <Modal fullscreen show={ showModifyModal } onHide={ handleCloseModifyModal }>
                        <Modal.Header closeButton>
                        <Modal.Title><span className="text-decoration-underline">Modifier le post :</span> { props.title }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form id="postForm" className="border border-1 rounded-3 border-black py-2 px-3 mt-3" onSubmit={ modifyOnePost }>
                                <Form.Group className="mb-3">
                                    <Form.Label>Titre</Form.Label>
                                    <Form.Control name="title" id="title" type="text" value={ title } onChange={ (e) => setTitle(e.target.value) } />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Contenu</Form.Label>
                                    <Form.Control name="subject" id="subject" type="text" value={ subject } onChange={ (e) => setSubject(e.target.value) } />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control name="image" id="image" type="file" />
                                    <Image src={ props.imgUrl } />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Soumettre
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                    {/*logique pour la suppression du post*/}
                    <Button onClick={ deletePost } variant="danger" className="rounded-pill px-3 me-md-2 btn-sm">
                        <i className="far fa-trash-alt"></i>
                        <span className="d-none d-md-inline ms-md-1">Supprimer</span>
                    </Button>
                </Card.Footer>        
            </Card>
        )    
    }
    /*si l'utilisateur n'est pas l'auteur*/
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
                <Button variant="warning" className="rounded-pill px-3 me-2 btn-sm" id="modifyPostButton">
                    <i className="fas fa-eye me-1"></i>
                    <span className="d-none d-md-inline">Voir</span>
                </Button>
            </Card.Footer>        
        </Card>
    ) 
}

//Liste des Cards component affichant l'ensemble des posts selon si l'utilisateur est isAdmin ou isAuthor
function Posts() {
    
    /*Création du useState items contenant la liste des posts issue du serveur*/
    const [items, setItems] = useState([]);
    /*Création du useEffect effectuant la requête vers le serveur*/
    useEffect(() => {
        Axios.get('http://localhost:4000/api/posts')
    .then((response) =>{
        setItems(response.data.result);
    })
    .catch(error => console.log(error));
    }, []);
    /*Options de conversion du datetime en date*/    
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    /*Vérification du log de l'utilisateur*/
    const isLogged = localStorage.getItem("token");
    /*Vérification du isAdmin de l'utilisateur*/
    const isAdmin = localStorage.getItem("isAdmin");
    /*Vérification du userId de l'utilisateur et conversion en nombre*/
    const userId =  Number(localStorage.getItem("userId"));
    /*Si l'utilisateur n'est pas connecté, redirection vers la page de connexion*/
    if(!isLogged) {
        window.location.href = "connexion";
    } else {
      /*Si l'utilisateur est connecté et qu'il est administrateur*/
        if(isAdmin > 0) {
            /*Affichage de la liste des posts avec isAuthor === true*/
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
                        />
                    )}
                </Container>
            )    
        }
        /*Si l'utilisateur est connecté et qu'il n'est pas administrateur*/
        /*Création de listItems qui contiendra la liste des posts à afficher*/
        var listItems = [] ;
        /*Pour chaque item présent dans la liste des posts issus du serveur*/
        for(let item of items) {
            /*Si l'id de l'utilisateur correspond à l'id de l'auteur de l'item*/
            if(item.author === userId) {
                /*Création d'une Card avec l'option isAuthor === true*/
                const displayItem = 
                    <Post 
                        key={item.id}
                        id={item.id}
                        isAuthor={ true }
                        author={item.authorFirstName}
                        authorId={item.author}
                        date={ new Date(item.date).toLocaleDateString("fr-FR", options)}
                        title={ item.title }
                        subject={item.subject}
                        imgUrl={item.img_url}
                    />;
                /*Ajout de la Card à la liste des posts à afficher*/
                listItems.push(displayItem);
            } else {
                /*Si l'id de l'utilisateur ne correspond pas à l'id de l'auteur de l'item*/
                /*Création d'une Card avec l'option isAuthor === false*/
                const displayItem = 
                    <Post 
                        key={item.id}
                        id={item.id}
                        isAuthor={ false }
                        author={item.authorFirstName}
                        authorId={item.author}
                        date={ new Date(item.date).toLocaleDateString("fr-FR", options)}
                        title={ item.title }
                        subject={item.subject}
                        imgUrl={item.img_url}
                    />;
                /*Ajout de la Card à la liste des posts à afficher*/
                listItems.push(displayItem);
            }
        }
        return(
            /*Affichage de la liste des posts*/
            <Container className="d-flex flex-wrap justify-content-center mt-5">
                <h1>Liste des posts</h1>
                {listItems}
            </Container>
        )
    }
}
export default Posts ;