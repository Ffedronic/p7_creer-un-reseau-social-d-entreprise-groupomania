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
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

/**
 * ! import de l'avatar
 */
import Avatar from '../avatar.png';

/**
* ! Création des constantes issues du localStorage
*/
const token = localStorage.getItem("token");

/**
* ! MyProfil component affichant le profil de l'utilisateur
*/
function MyProfil() {

    /**
    * * Création des useStates pour l'affichage du profil
    */
    const [profil, setProfil] = useState([]);

    /**
    * * Envoi de la requête au serveur
    */
    useEffect(() => {
        Axios.defaults.headers['Authorization'] =`Bearer ${token}`;
        Axios.get('http://localhost:4000/api/auth/myProfil')
        .then((response) =>{
            setProfil(response.data.result[0]);
        })
        .catch(error => console.log(error));
    }, []);

    /**
    * * Création des useStates pour l'affichage du modal de modification du profil
    */
     const [showModifyModal, setShowModifyModal] = useState(false);
     const [firstName, setFirstName] = useState(`${profil.firstName}`);
     const [lastName, setLastName] = useState(profil.lastName);
     const [email, setEmail] = useState(profil.email);
    
    /**
    * * Création des fonctions pour le fonctionnement du modal de modification
    */
    const handleCloseModifyModal = () => {      //Ferme le modal et met à jour l'affichage du profil
        setShowModifyModal(false);
        profil.firstName = firstName;
        profil.lastName = lastName;
        profil.email = email;
        document.getElementById("profilLastName").innerHTML = lastName;
        document.getElementById("profilFirstName").innerHTML = firstName;
        document.getElementById("profilEmail").innerHTML = email;
    };
    const handleShowModifyModal = () => {       //Affiche le modal avec les infos utilisateurs dans les champs de formulaire
        setShowModifyModal(true);
        setFirstName(profil.firstName);
        setLastName(profil.lastName);
        setEmail(profil.email);
    };
    const modifyMyProfil = (event) => {         //Modifie le profil utilisateur dans la base données
        event.preventDefault();
        const newProfil = {
            firstName : firstName,
            lastName : lastName,
            email : email
        };
        Axios.defaults.headers['Authorization'] =`Bearer ${token}`;
        Axios.put('http://localhost:4000/api/auth/myProfil', newProfil)
        .then((response) =>{
            console.log(response.data.result);
            handleCloseModifyModal();
        })
        .catch(error => console.log(error));
    };
    const deleteMyProfil = (event) => {         //Supprime le profil utilisateur de la base de données, vide le localStorage et ramène vers la page de connexion
        Axios.defaults.headers['Authorization'] =`Bearer ${token}`;
        Axios.delete('http://localhost:4000/api/auth/myProfil')
        .then(() => {
            localStorage.clear();
            window.location.href = "/connexion";
        })
        .catch(error => console.log(error));
    };

    /**
     * * Création de la carte du profil de l'utilisateur
     */
    return(
        <Container className="d-flex flex-row justify-content-center">
            <Card className="w-75 mt-5" bg="light">
                <Card.Header className="fw-bold text-white bg-success">
                    Mon Profil
                </Card.Header>
                <Card.Body>
                    <ul className="list-unstyled d-md-flex flex-row justify-content-around align-items-center">
                        <li>
                            <Card.Img as={ Image } roundedCircle className="image" src={ Avatar } />
                        </li>
                        <li>
                            <ul className="mt-3 mt-md-0">
                                <li className="text-capitalize">
                                    <span className="text-capitalize fw-bold">Prénom :</span> <span id="profilFirstName">{profil.firstName}</span>,
                                </li>
                                <li className="text-capitalize">
                                    <span className="fw-bold">Nom :</span> <span id="profilLastName">{profil.lastName}</span>,
                                </li>
                                <li>
                                    <span className="fw-bold">Email :</span> <span id="profilEmail">{profil.email}</span>,
                                </li>
                            </ul>
                        </li>
                    </ul>
                </Card.Body>
                <Card.Footer>
                    <ul className="list-unstyled d-flex flex-row justify-content-between justify-content-md-around">
                        <li>
                            <Button onClick={ handleShowModifyModal } variant="warning">Modifier</Button>
                            <Modal fullscreen show={ showModifyModal } onHide={ handleCloseModifyModal }>
                                <Modal.Header closeButton>
                                    <Modal.Title><span className="text-decoration-underline">Modifier mon Profil :</span></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form id="postForm" className="border border-1 rounded-3 border-black py-2 px-3 mt-3" onSubmit={ modifyMyProfil }>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Prénom :</Form.Label>
                                            <Form.Control name="firstName" id="firstName" type="text" value={ firstName } onChange={ (e) => setFirstName(e.target.value) } />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Nom :</Form.Label>
                                            <Form.Control name="lastName" id="lastName" type="text" value={ lastName } onChange={ (e) => setLastName(e.target.value) } />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Email :</Form.Label>
                                            <Form.Control name="email" id="email" type="text" value={ email } onChange={ (e) => setEmail(e.target.value) } />
                                        </Form.Group>
                                        <Button variant="primary" type="submit">
                                            Soumettre
                                        </Button>
                                    </Form>
                                </Modal.Body>
                            </Modal>
                        </li>
                        <li>
                            <Button onClick={ deleteMyProfil } variant="danger">
                                Supprimer
                            </Button>
                        </li>
                    </ul>
                </Card.Footer>
            </Card>
        </Container>
    )
};

export default MyProfil ;