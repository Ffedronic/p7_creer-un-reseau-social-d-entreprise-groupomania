/**
  * ! import des classes boostrap
  */
 import 'bootstrap';
 
 /**
  * ! import des react-boostrap components
  */
 import Card from 'react-bootstrap/Card';
 import Button from 'react-bootstrap/Button';
 
 /**
  * ! Comment component affichant un commentaire
  */
 function Comment(props) {
     const isAuthor = props.isAuthor;
     if(isAuthor) {
         return(
             <Card className="mb-3">
                 <Card.Header className="text-capitalize d-flex flex-row justify-content-between">
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
                 <Card.Header className="text-capitalize d-flex flex-row justify-content-between">
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

export default Comment ;