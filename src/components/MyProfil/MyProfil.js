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
 * ! import de l'avatar
 */
import Avatar from '../avatar.png';

/**
* ! Création des constantes issues du localStorage
*/
const token = localStorage.getItem("token");

function MyProfil() {
    const [profil, setProfil] = useState([]);
    useEffect(() => {
        Axios.defaults.headers['Authorization'] =`Bearer ${token}`;
        Axios.get('http://localhost:4000/api/auth/myProfil')
        .then((response) =>{
            setProfil(response.data.result[0]);
        })
        .catch(error => console.log(error));
    }, []);
    console.log(profil);
    return(
        <Container>
            Mon profil
        </Container>
    )
};

export default MyProfil ;