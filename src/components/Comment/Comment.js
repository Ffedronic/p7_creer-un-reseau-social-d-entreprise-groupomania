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
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
 
/**
* ! Création des constantes issues du localStorage
*/
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");

/**
* ! Comment component affichant un commentaire
*/
function Comment(props) {

    const postId = props.postId;
    const isAuthor = props.isAuthor;
    
    const deleteComment = (event) => {
        event.preventDefault();
        /**
        * Requête Axios pour suppression du commentaire de la base de données
        */
        Axios.defaults.headers['Authorization'] =`Bearer ${token} ${isAdmin}`;
        Axios.delete(`http://localhost:4000/api/posts/${postId}/comments/${props.commentId}`)
            .then((result) => {
                console.log(result);
            })
            .catch(error => console.log(error));
        /**
        * * Suppression du commentaire du DOM de la page
        */
        const commentId = event.target.dataset.commentid;
        document.getElementById(commentId).remove();
    };

    if(isAuthor) {
        return(
            <Card id={props.commentId} className="mb-3 w-100">
                <Card.Header className="text-capitalize d-flex flex-row justify-content-between">
                    <div>
                        {props.commentAuthor}
                    </div>
                    <div>
                        le {props.commentDate}
                    </div>
                </Card.Header>
                <Card.Body>
                    {props.commentContent}
                </Card.Body>
                <Card.Footer>
                    <Button data-commentid={props.commentId} onClick={ deleteComment } variant="danger" className="rounded-pill px-3 me-md-2 btn-sm">
                        Supprimer
                    </Button>
                </Card.Footer>
            </Card>
        )
    } else {
        return(
            <Card id={props.commentId} className="mb-3 w-100">
                <Card.Header className="text-capitalize d-flex flex-row justify-content-between">
                    <div>
                        {props.commentAuthor}
                    </div>
                    <div>
                        le {props.commentDate}
                    </div>
                </Card.Header>
                <Card.Body>
                    {props.commentContent}
                </Card.Body>
            </Card>
        )
    }
}

export default Comment ;