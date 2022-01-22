/**
* ! import du useState et useEffect
*/
import { useState, useEffect } from "react";

/**
* ! import du schéma Post
*/
import Post from "../Post/Post";

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


/**
* ! Création des constantes issues du localStorage
*/
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("isAdmin");
const userId =  Number(localStorage.getItem("userId"));


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
                <Container className="mt-5">
                    <main>
                        <ul className=" list-unstyled">
                        { items.map((post) => 
                        <Post 
                            key={ post.id }
                            postId={ post.id }
                            isAuthor={ true }
                            postAuthor={ post.authorFirstName }
                            postAuthorId={ post.author }
                            postDate={ new Date(post.date) }
                            postTitle={ post.title }
                            postSubject={ post.subject }
                            postImgUrl={ post.img_url }
                            />
                        )}
                        </ul>
                    </main>
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
                        postDate={ new Date(item.date) }
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
                        postDate={ new Date(item.date) }
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
            <Container className="mt-5">
                <main>
                    <ul className=" list-unstyled">
                    { listItems }
                    </ul>
                </main>
            </Container>
        )
    }
}
export default Posts ;