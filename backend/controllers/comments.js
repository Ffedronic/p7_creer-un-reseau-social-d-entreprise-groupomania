//import mysql
const mysql = require('mysql');

//import dotenv
const dotenv = require('dotenv');

dotenv.config();

//connexion à la base données sql
const groupomaniaDBConnect = mysql.createConnection({
    host: process.env.GROUPOMANIA_HOSTNAME,
    user: process.env.GROUPOMANIA_USERNAME,
    password: process.env.GROUPOMANIA_USERPASSWORD,
    database: process.env.GROUPOMANIA_DB
});

//controller pour récupérer les commentaires d'un post dont l'id est fourni
exports.getComments = (req, res, next) => {
    /*création de la requête sql pour selectionner les commentaires du post dans la base de données dont l'id est fourni
     par les paramètres de requête*/
    const sqlGetComments = `SELECT comments.id AS id, comments.content AS content, users.firstName FROM comments JOIN users ON comments.author = users.id WHERE post = '${req.params.id}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlGetComments, (error, result) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        /*envoi du résultat de la requête sql*/
        res.status(200).json({
            result
        });
        console.log("commentaires récupérés.");
    });
};

//controller pour créer un commentaire au sujet d'un post
exports.createOneComment = (req, res, next) => {
    /*création de la requête sql pour créer un commentaire au sujet du post dans la base de données dont l'id est fourni
    par les paramètres de requête*/
    const sqlCreateOneComment = `INSERT INTO comments (content, author, post) VALUES ('${req.body.content}', '${req.body.userId}', '${req.params.id}')`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlCreateOneComment, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        /*envoi du message de validation de la création du commentaire*/
        res.status(200).json({
            message: "commentaire créé."
        });
    });
};

//controller pour modifier un commentaire au sujet d'un post
exports.modifyOneComment = (req, res, next) => {
    /*création de la requête sql pour modifier un commentaire au sujet du post dans la base de données dont l'id est fourni
    par les paramètres de requête*/
    const sqlmodifyOneComment = `UPDATE comments SET content = '${req.body.content}' WHERE id = '${req.params.id}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlmodifyOneComment, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        /*envoi du message de validation de la modification du commentaire*/
        res.status(200).json({
            message: "commentaire modifié."
        });
    });
};

//controller pour supprimer un commentaire d'un post dont l'id et l'id utilisateur sont fournis
exports.deleteOneComment = (req, res, next) => {
    /*création de la requête sql pour supprimer un commentaire au sujet du post dans la base de données dont l'id est fourni
    par les paramètres de requête*/
    const sqlDeleteComment = `DELETE FROM comments WHERE id = '${req.params.id}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlDeleteComment, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        /*envoi du message de validation de la modification du commentaire*/
        res.status(200).json({
            message: "commentaire supprimé."
        });
    });
};