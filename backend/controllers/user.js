//import mysql
const mysql = require('mysql');

//import dotenv
const dotenv = require('dotenv');
dotenv.config();

//import jswebtoken
const jwt = require('jsonwebtoken');

//connexion à la base données sql
const groupomaniaDBConnect = mysql.createConnection({
    host: process.env.GROUPOMANIA_HOSTNAME,
    user: process.env.GROUPOMANIA_USERNAME,
    password: process.env.GROUPOMANIA_USERPASSWORD,
    database: process.env.GROUPOMANIA_DB
});

//import de bcrpyt pour le hashage des mots de passe
const bcrypt = require('bcrypt');

//controller pour l'inscription d'un utilisateur à l'application
exports.signUp = (req, res, next) => {

    /*hashage du mot de passe saisi par l'utilisateur*/
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            /*création de la requête sql pour créer le profil utilisateur dans la base de données sql*/
            const sqlCreateUser = `INSERT INTO users (firstName, lastName, email, password, isAdmin) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${hash}', '0')`;
            /*envoi de la requête au serveur*/
            groupomaniaDBConnect.query(sqlCreateUser, (error, result) => {
                /*si l'insertion est impossible*/
                if (error) {
                    throw error;
                }
                console.log("utilisateur ajouté à la base données.");
                /*sinon, envoi du message de validation de la création de l'utilisateur dans la base de données*/
                res.status(200).json({
                    result
                });
            });
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

/*controller pour la connexion d'utilisateur à l'application*/
exports.login = (req, res, next) => {
    /*création de la requête sql pour rechercher le profil utilisateur dans la base de données sql à partir de 
    l'email fourni par l'application*/
    const sqlSearchUser = `SELECT * FROM users WHERE email = '${req.body.email}'`;
    /*envoi de la requête au serveur*/
    groupomaniaDBConnect.query(sqlSearchUser, (error, result) => {
        if (error) {
            throw error;
        }
        /*création du profil utilisateur à partir de la réponse de la requête sqlSearchUser*/
        const userProfil = result[0];

        /*comparaison du mot de passe entré par l'utilisateur avec le mot de passe crypté présent dans le profil utilisateur
        issu de la base données*/
        bcrypt.compare(req.body.password, userProfil.password)
            .then((valid) => {
                /*si la comparaison est invalide,*/
                if (!valid) {
                    return res.status(401).json({
                        message: "mot de passe incorrect."
                    });
                } else {
                    /*envoi du cookie contenant l'id de l'utilisateur, son token, son isAdmin*/
                    res.status(200).json({
                        userId: userProfil.id,
                        token: jwt.sign({
                        userId: userProfil.id
                        }, 
                        process.env.GROUPOMANIA_SECRET_KEY,
                        {
                        expiresIn: "168h"
                        }),
                    isAdmin: userProfil.isAdmin });
                }
            })
            .catch((error) => res.status(500).json({
                error
            }));
    });
};

//controller pour accéder à son profil utilisateur
exports.getMyProfil = (req, res, next) => {
    /*création de la requête sql pour rechercher le prénom, nom et email de l'utilisateur dans la base données à partir de son id 
    fourni par le profil utilisateur*/
    const sqlSearchMyProfil = `SELECT id, firstName, lastName, email FROM users WHERE id = '${res.locals.userId}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlSearchMyProfil, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                message: error
            });
        }
        /*envoi au client de la réponse issue du serveur sql contenant le prénom, nom et email de l'utilisateur dans la base de données*/
        res.status(200).json({
            result
        });
    });
};

//controller pour modifier son profil utilisateur
exports.modifyMyProfil = (req, res, next) => {
    /*création de la requête sql pour mettre à jour le prénom, nom et email de l'utilisateur dans la base de données à partir de son id 
    fourni par le profil utilisateur*/
    const sqlUpdateMyProfil = `UPDATE users SET firstName = '${req.body.firstName}', lastName = '${req.body.lastName}', email = '${req.body.email}' WHERE id = '${res.locals.userId}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlUpdateMyProfil, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
        /*envoi du résultat de la requête sql*/
        res.status(200).json({
            result
        });
    });
};

//controller pour supprimer son profil utilisateur
exports.deleteMyProfil = (req, res, next) => {
    /*création de la requête sql pour supprimer l'utilisateur de la base de données à partir de son id fourni par le profil utilisateur*/
    const sqlDeleteMyProfil = `DELETE FROM users WHERE id = '${res.locals.userId}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlDeleteMyProfil, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
        /*envoi du message de validation de la suppression du profil dans la base de données*/
        res.status(200).json({
            result
        });
    });
};

//controller pour voir le profil d'un utilisateur
exports.getUserProfil = (req, res, next) => {
    /*création de la requête sql pour récupérer le prénom, le nom, l'email de l'utilisateur dans la base de données
    dont l'id est fourni par les paramètres de la requete client*/
    const sqlSearchUserProfil = `SELECT firstName, lastName, email FROM users WHERE id = '${req.params.id}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlSearchUserProfil, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json({
                error
            });
        }
        /*envoi du résultat de la requête sql*/
        res.status(200).json({
            result
        });
    });
};

//controller pour supprimer le profil d'un utilisateur
exports.deleteUserProfil = (req, res, next) => {

    if (res.locals.isAdmin === 1) {
        /*création de la requête sql pour supprimer l'utilisateur dans la base de données
        dont l'id est fourni par les paramètres de la requete client*/
        const sqlDeleteUserProfil = `DELETE FROM users WHERE id = '${req.params.id}'`;
        /*envoi de la requête au serveur sql*/
        groupomaniaDBConnect.query(sqlDeleteUserProfil, (error) => {
            if (error) {
                console.log(error);
                res.status(500).json({
                    message: error
                });
            }
            /*envoi du résultat de la requête sql*/
            res.status(200).json({
                message: "le profil a été supprimé."
            });
        });

    } else {
        res.status(401).json({
            message: "non autorisé à supprimé un profil"
        });
    }
};