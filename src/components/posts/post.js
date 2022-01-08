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
 * ! Création des constantes issues du localStorage
 */
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const userId =  Number(localStorage.getItem("userId"));

/**
* * Options de conversion du datetime en date
*/    
 const options = { year: 'numeric', month: 'long', day: 'numeric' };


/**
 * ! Comment component affichant un commentaire
 */
function Comment(props) {
    const isAuthor = props.isAuthor;
    if(isAuthor) {
        return(
            <Card className="mb-3">
                <Card.Header className="text-capitalize">
                    <div>
                        {props.commentAuthor}
                    </div>
                    <div>
                    commenté le {props.commentDate}
                    </div>
                </Card.Header>
                <Card.Body>
                    {props.commentContent}
                </Card.Body>
                <Card.Footer>
                    <Button variant="danger" className="rounded-pill px-3 me-md-2 btn-sm">
                        <i className="far fa-trash-alt"></i>
                        <span className="d-none d-md-inline ms-md-1">Supprimer</span>
                    </Button>
                </Card.Footer>
            </Card>
        )
    } else {
        return(
            <Card className="mb-3">
                <Card.Header className="text-capitalize">
                    <div>
                        {props.commentAuthor}
                    </div>
                    <div>
                        commenté le {props.commentDate}
                    </div>
                </Card.Header>
                <Card.Body>
                    {props.commentContent}
                </Card.Body>
            </Card>
        )
    }
}

/**
 * ! Post component affichant un post
 */
function Post (props) {
    
    /**
     * * Création des useStates pour l'affichage du modal de visualisation du post
    */
    const [showModal, setShowModal] = useState(false);
    const [commentToSend, setCommentToSend] = useState("");
    const [comments, setComments] = useState([]);
    
    /**
     * * UseEffect qui télécharge les commentaires en fonction des posts
     */
    useEffect(() => {
        Axios.get(`http://localhost:4000/api/posts/${props.postId}/comments`)
    .then((response) =>{
        setComments(response.data.result);
    })
    .catch(error => console.log(error));
    }, [props.postId]);
    
    /**
     * * Génération de la liste des commentaires à afficher
    */
     var listComments= [];
     /**
      * ? Si je suis administrateur, isAuthor = true pour tous les commentaires
      */
     if(isAdmin > 0) {
         listComments = comments.map((comment) => <Comment key={comment.id} isAuthor={true} commentAuthor={comment.firstName} commentId={comment.id} commentContent={comment.content} commentDate={new Date(comment.date).toLocaleDateString("fr-FR", options)} />) ;
     } else {
         for(let comment of comments){
             /**
             * ? Si je ne suis pas administrateur et que je suis l'auteur du commentaire, isAuthor = true pour le commentaire
             */
             if(Number(comment.authorId) === userId){
                 const commentToDisplay = <Comment key={comment.id} isAuthor={true} commentAuthor={comment.firstName} commentId={comment.id} commentContent={comment.content} commentDate={new Date(comment.date).toLocaleDateString("fr-FR", options)} />;
                 listComments.push(commentToDisplay);
             /**
             * ? Si je ne suis pas administrateur et que je ne suis pas l'auteur du commentaire, isAuthor = false pour le commentaire
             */
             } else {
                 const commentToDisplay = <Comment key={comment.id} isAuthor={false} commentAuthor={comment.firstName} commentId={comment.id} commentContent={comment.content} commentDate={new Date(comment.date).toLocaleDateString("fr-FR", options)} />;
                 listComments.push(commentToDisplay);
             }
         }
    }

    /**
     * * Création des fonctions nécessaires au modal de visualisation du post
    */
     const handleCloseModal = () => setShowModal(false);    //fermeture du modal de visualisation
     const handleShowModal = () => {
        setShowModal(true);
     }
     /**
     * * Création des useStates pour l'affichage du modal de modification du post
    */
    const [showModifyModal, setShowModifyModal] = useState(false);
    const [title, setTitle] = useState(`${props.postTitle}`);
    const [subject, setSubject] = useState(`${props.postSubject}`);
    
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
        Axios.defaults.headers['Authorization'] =`Bearer ${token} ${isAdmin}`;
        Axios.put(`http://localhost:4000/api/posts/${props.postId}`, modifyFormData)
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
        Axios.defaults.headers['Authorization'] =`Bearer ${token} ${isAdmin}`;
        Axios.delete(`http://localhost:4000/api/posts/${props.postId}`)
        .then((result) => {
            console.log(result);
            window.location.href = "posts";
        })
        .catch(error => console.log(error));
    };
    
    /**
     * * Création de la constante isAuthor pour le post
     */
    const isAuthor = props.isAuthor ;

     /**
     * ? Si l'utilisateur est auteur ou isAdmin du post
     */

    if(isAuthor) {
           
        return (
            /**
             * * Création du post sous forme de Card react-component
             */
            <Card className="m-2 card">
                <Card.Header className="d-flex flex-row justify-content-between">
                    <div>
                        <span className="d-none">{ props.postId }</span>
                        <span className="text-uppercase fw-bold">{ props.postAuthor }</span>
                        <span className="d-none" id="authorId">{ props.postAuthorId}</span>
                    </div>
                    <span className="ms-5">{ props.postDate }</span>
                </Card.Header>
                <Card.Img variant="top" as={ Image } src={ props.postImgUrl } thumbnail />
                <Card.Body>
                    <Card.Title>{ props.postTitle }</Card.Title>
                    <Card.Text>{ props.postSubject }</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex flex-row justify-content-around">
                    {/*logique pour la visualisation du post avec ses commentaires*/}
                    <Button variant="warning" className="rounded-pill px-3 me-md-2 btn-sm" onClick={ handleShowModal }>
                        <i className="fas fa-eye"></i>
                        <span className="d-none d-md-inline ms-md-1">Voir</span>
                    </Button>
                    <Modal fullscreen show={ showModal } onHide={ handleCloseModal }>
                        <Modal.Header closeButton>
                        <Modal.Title>Post n°{ props.postId }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Card>
                            <Card.Img variant="top" as={ Image } src={ props.postImgUrl } thumbnail />
                            <Card.Body>
                                <Card.Title>{ props.postTitle }</Card.Title>
                                <Card.Text>{ props.postSubject }</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Accordion defaultActiveKey="0">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Commentaires</Accordion.Header>
                                        <Accordion.Body>
                                            {listComments}
                                            <Form className="mt-3 mb-3 border border-1 p-3">
                                                <Form.Group className="mt-3 mb-3">
                                                    <Form.Label>Commenter le post</Form.Label>
                                                    <Form.Control name="comment" id="comment" type="text" value={ commentToSend } onChange={ (e) => setCommentToSend(e.target.value) } />
                                                </Form.Group>                
                                                <Button variant="primary" type="submit">
                                                    Envoyer
                                                </Button>
                                            </Form>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </Card.Footer>
                          </Card>
                        </Modal.Body>
                        <Modal.Footer>
                            <span className="text-capitalize">créé par {props.postAuthor}, le { props.postDate }</span>
                        </Modal.Footer>
                    </Modal>
                    {/*logique pour la modification du post */}
                    <Button onClick={ handleShowModifyModal } variant="primary" className="rounded-pill px-3 me-md-2 btn-sm">
                        <i className="far fa-edit"></i>
                        <span className="d-none d-md-inline ms-md-1">Modifier</span>
                    </Button>
                    <Modal fullscreen show={ showModifyModal } onHide={ handleCloseModifyModal }>
                        <Modal.Header closeButton>
                        <Modal.Title><span className="text-decoration-underline">Modifier le post :</span> { props.postTitle }</Modal.Title>
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
                                    <Image src={ props.postImgUrl } />
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
    /**
     * ? Si l'utilisateur n'est pas isAdmin ou autheur du post
     */
    else{ 
        return (
            <Card className="m-2 card">
                <Card.Header className="d-flex flex-row justify-content-between">
                    <div>
                        <span className="d-none">{ props.postId }</span>
                        <span className="text-uppercase fw-bold">{ props.postAuthor }</span>
                        <span className="d-none" id="authorId">{ props.postAuthorId}</span>
                    </div>
                    <span className="ms-5">{ props.postDate }</span>
                </Card.Header>
                <Card.Img variant="top" as={ Image } src={ props.postImgUrl } thumbnail />
                <Card.Body>
                    <Card.Title>{ props.postTitle }</Card.Title>
                    <Card.Text>{ props.postSubject }</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex flex-row justify-content-around">
                    {/*logique pour la visualisation du post avec ses commentaires*/}
                    <Button variant="warning" className="rounded-pill px-3 me-md-2 btn-sm" onClick={ handleShowModal }>
                            <i className="fas fa-eye"></i>
                            <span className="d-none d-md-inline ms-md-1">Voir</span>
                    </Button>
                    <Modal fullscreen show={ showModal } onHide={ handleCloseModal }>
                        <Modal.Header closeButton>
                        <Modal.Title>Post n°{ props.postId }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card>
                                <Card.Img variant="top" as={ Image } src={ props.postImgUrl } thumbnail />
                                <Card.Body>
                                    <Card.Title>{ props.postTitle }</Card.Title>
                                    <Card.Text>{ props.postSubject }</Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Accordion defaultActiveKey="0">
                                        <Accordion.Item eventKey="0">
                                            <Accordion.Header>Commentaires</Accordion.Header>
                                            <Accordion.Body>
                                                { listComments }
                                                <Form className="mt-3 mb-3 border border-1 p-3">
                                                    <Form.Group className="mt-3 mb-3">
                                                        <Form.Label>Commenter le post</Form.Label>
                                                        <Form.Control name="comment" id="comment" type="text" value={ commentToSend } onChange={ (e) => setCommentToSend(e.target.value) } />
                                                    </Form.Group>                
                                                    <Button variant="primary" type="submit">
                                                        Envoyer
                                                    </Button>
                                                </Form>                                        
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                </Card.Footer>
                            </Card>
                        </Modal.Body>
                        <Modal.Footer>
                            <span className="text-capitalize">créé par {props.postAuthor}, le { props.postDate }</span>
                        </Modal.Footer>
                    </Modal>
                </Card.Footer>        
            </Card>
        ) 
    }
    
}

/**
 * ! Posts component affichant la liste des posts issus de la base de données
 */
function Posts() {
    
    /**
     * * Création du useState items contenant la liste des posts à afficher
    */
    const [items, setItems] = useState([]);
    
    /**
     * * Création du useEffect effectuant la requête vers le serveur
    */
    useEffect(() => {
        Axios.get('http://localhost:4000/api/posts')
    .then((response) =>{
        setItems(response.data.result);
    })
    .catch(error => console.log(error));
    }, []);

    /**
     * ? Si l'utilisateur n'est pas connecté, redirection vers la page de connexion
    */
    if(!token) {
        window.location.href = "connexion";
    } else {

      /**
       * ? Si l'utilisateur est connecté et qu'il est administrateur
      */
        if(isAdmin > 0) {
            /**
             * * Affichage de la liste des posts avec isAuthor === true
            */
            return(
                <Container className="d-flex flex-wrap justify-content-center mt-5">
                    { items.map((post) => 
                    <Post 
                        key={ post.id }
                        postId={ post.id }
                        isAuthor={ true }
                        postAuthor={ post.authorFirstName }
                        postAuthorId={ post.author }
                        postDate={ new Date(post.date).toLocaleDateString("fr-FR", options) }
                        postTitle={ post.title }
                        postSubject={ post.subject }
                        postImgUrl={ post.img_url }
                        />
                    )}
                </Container>
            )    
        }

        /**
         * ? Si l'utilisateur n'est pas administrateur
        */
        /**
         * * Création de listItems qui contiendra l'ensemble des posts à afficher
        */
        var listItems = [] ;
        /**
         * * Pour chaque item présent dans la liste des posts issus du serveu
        */
        for(let item of items) {
            /**
             * * Si l'id de l'utilisateur correspond à l'id de l'auteur de l'item
            */
            if(item.author === userId) {
                /**
                 * * Création d'une Card avec l'option isAuthor === true
                */
                const displayItem = 
                    <Post 
                        key={ item.id }
                        postId={ item.id }
                        isAuthor={ true }
                        postAuthor={ item.authorFirstName }
                        postAuthorId={ item.author }
                        postDate={ new Date(item.date).toLocaleDateString("fr-FR", options)}
                        postTitle={ item.title }
                        postSubject={ item.subject }
                        postImgUrl={ item.img_url }
                    />;
                /**
                 * * Ajout de la Card à la liste des posts à afficher
                */
                listItems.push(displayItem);
            } else {
                /**
                 * ? Si l'id de l'utilisateur ne correspond pas à l'id de l'auteur de l'item
                 */
                /**
                 * * Création d'une Card avec l'option isAuthor === false
                 */
                const displayItem = 
                    <Post 
                        key={ item.id }
                        postId={ item.id }
                        isAuthor={ false }
                        postAuthor={ item.authorFirstName }
                        postAuthorId={ item.author }
                        postDate={ new Date(item.date).toLocaleDateString("fr-FR", options)}
                        postTitle={ item.title }
                        postSubject={ item.subject }
                        postImgUrl={ item.img_url }
                    />;
                /**
                 * * Ajout de la Card à la liste des posts à afficher
                */
                listItems.push(displayItem);
            }
        }
        return(
            /**
             * ! Affichage de la liste des posts
            */
            <Container className="d-flex flex-wrap justify-content-center mt-5">
                { listItems }
            </Container>
        )
    }
}
export default Posts ;