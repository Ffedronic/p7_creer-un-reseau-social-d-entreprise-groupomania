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

    //hashage du mot de passe saisi par l'utilisateur
    bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            //insertion de l'utilisateur dans la base de données
            const sqlCreateUser = `INSERT INTO users (firstName, lastName, email, password, isAdmin) VALUES ('${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${hash}', '0')`;
            groupomaniaDBConnect.query(sqlCreateUser, (error) => {
                if (error) throw error;
                console.log("utilisateur ajouté à la base données.");
            });
            res.status(200).json({
                message: "utilisateur créé."
            });
        })
        .catch((error) => res.status(500).json({
            error
        }));
};

//controller pour la connexion d'utilisateur à l'application
exports.signIn = (req, res, next) => {
    //recherche de l'utilisateur dans la base de données
    groupomaniaDBConnect.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, (error, result) => {
        if (error) {
            throw error;
        }
        //récupération du résultat de la recherche de l'utilisateur
        const userProfil = result[0];
        //comparaison du mot de passe de la requête au mot de passe haché dans la base de données
        bcrypt.compare(req.body.password, userProfil.password)
            .then((valid) => {
                if (!valid) {
                    return res.status(401).json({
                        message: "mot de passe incorrect"
                    });
                }
                //création du token à partir de l'id de l'utilisateur founi dans la base de données
                const token = jwt.sign({
                    userId: userProfil.id
                }, process.env.GROUPOMANIA_SECRET_KEY, {
                    expiresIn: "168h"
                });
                //envoi du cookie contenant le profil de l'utilisateur
                res.cookie("userProfil", {
                    id: userProfil.id,
                    token: token,
                    firstName: userProfil.firstName,
                    lastName: userProfil.lastName,
                    email: userProfil.email,
                    isAdmin: userProfil.isAdmin
                }, {
                    maxAge: 604800000,
                    httpOnly: true
                });
                res.status(200).json({
                    message: "utilisateur retrouvé."
                });
            })
            .catch((error) => res.status(500).json({
                error
            }));
    });
};

//controller pour accéder à son profil utilisateur
exports.getMyProfil = (req, res, next) => {

};

//controller pour modifier son profil utilisateur
exports.modifyMyProfil = (req, res, next) => {

};

//controller pour supprimer son profil utilisateur
exports.deleteMyProfil = (req, res, next) => {

};

//controller pour voir le profil d'un utilisateur
exports.getUserProfil = (req, res, next) => {

};

//controller pour supprimer le profil d'un utilisateur
exports.deleteUserProfil = (req, res, next) => {

};