//import mysql
const mysql = require('mysql2');

//import de file system
const fs = require('fs');

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

//controller pour récupérer les posts de la base de données
exports.getPosts = (req, res, next) => {
    /*récupération de tous les posts présents dans la base de données en faisant une jointure avec la table users
    pour récupérer le prénom de l'auteur*/
    const sqlGetPosts = `SELECT posts.id AS id, posts.title AS title, posts.subject AS subject, posts.img_url AS img_url, posts.date AS date, users.firstName AS author FROM posts JOIN users ON posts.author = users.id`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            throw error;
        }
        /*envoi du résultat de la requête sql*/
        res.status(200).json({
            result
        });
    });
};

//controller pour récupérer un post de la base de données
exports.getOnePost = (req, res, next) => {
    /*récupération du post présent dans la base de données dont l'id est fourni par les paramètres de requête client en faisant une jointure avec la table users
    pour récupérer le prénom de l'auteur*/
    const sqlGetOnePost = `SELECT posts.title AS title, posts.subject AS subject, posts.img_url AS img_url, posts.date AS date, posts.author AS authorId, users.firstName AS authorFirstName FROM posts JOIN users ON posts.author = users.id WHERE posts.id = '${req.params.id}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlGetOnePost, (error, result) => {
        if (error) {
            throw error;
        }
        /*envoi du résultat de la requête sql*/
        res.status(200).json({
            result
        });
    });
};

//controller pour créer un post
exports.createOnePost = (req, res, next) => {
    /*si la requête contient une image*/
    if (req.file) {
        /*création de l'objet post*/
        const post = {
            title: req.body.title,
            subject: req.body.subject,
            img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            author: res.locals.userId
        };
        /*création de la requête sql pour insérer le post dans la base de données dont l'id de l'auteur est fourni par le profil utilisateur issu du cookie d'authentification*/
        const sqlCreateOnePost = `INSERT INTO posts (title, subject, img_url, author) VALUES ('${post.title}', '${post.subject}', '${post.img_url}', ${post.author})`;
        /*envoi de la requête au serveur sql*/
        groupomaniaDBConnect.query(sqlCreateOnePost, (error, result) => {
            if (error) {
                throw error;
            }
            /*envoi du résultat de la requête sql*/
            res.status(200).json({
                result
            });
        });
    }
    /*si la requête ne contient pas d'image*/
    else {
        /*création de l'objet post*/
        const post = {
            title: req.body.title,
            subject: req.body.subject,
            author: res.locals.userId
        };
        /*création de la requête sql pour insérer un post dans la base de données dont l'id de l'auteur est fourni par le profil utilisateur issu du cookie d'authentification*/
        const sqlCreateOnePost = `INSERT INTO posts (title, subject, author) VALUES ('${post.title}', '${post.subject}', ${post.author})`;
        /*envoi de la requête au serveur sql*/
        groupomaniaDBConnect.query(sqlCreateOnePost, (error, result) => {
            if (error) {
                throw error;
            }
            /*envoi du résultat de la requête sql*/
            res.status(200).json({
                result
            });
        });
    }
};

//controller pour modifier un post
exports.modifyOnePost = (req, res, next) => {
    /*si la requête contient une image*/
    if (req.file) {
        /*création de l'objet post*/
        const post = {
            title: req.body.title,
            subject: req.body.subject,
            img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        /*création de la requête sql pour modifier le post dans la base de données dont l'id est fourni par les paramètres de la requête*/
        const sqlModifyOnePost = `UPDATE posts SET title = '${post.title}', subject = '${post.subject}', img_url = '${post.img_url}' WHERE id = '${req.params.id}' AND author ='${res.locals.userId}'`;
        /*envoi de la requête au serveur sql*/
        groupomaniaDBConnect.query(sqlModifyOnePost, (error) => {
            if (error) {
                throw error;
            }
            /*envoi du message de validation de la modification du post*/
            res.status(200).json({
                message: 'post modifié.'
            });
        });
    }
    /*si la requête ne contient pas d'image*/
    else {
        /*création de l'objet post*/
        const post = {
            title: req.body.title,
            subject: req.body.subject
        };
        /*création de la requête sql pour modifier le post dans la base de données dont l'id est fourni par les paramètres de la requête*/
        const sqlModifyOnePost = `UPDATE posts SET title = '${post.title}', subject = '${post.subject}' WHERE id = '${req.params.id}' AND author ='${res.locals.userId}'`;
        /*envoi de la requête au serveur sql*/
        groupomaniaDBConnect.query(sqlModifyOnePost, (error) => {
            if (error) {
                throw error;
            }
            /*envoi du message de validation de la modification du post*/
            res.status(200).json({
                message: 'post modifié.'
            });
        });
    }
};

//controller pour supprimer un post
exports.deleteOnePost = (req, res, next) => {
    /*création de la requête sql pour sélectionner le post dans la base de données dont l'id est fourni par les paramètres de la requête*/
    const sqlGetPosts = `SELECT * FROM posts WHERE id = '${req.params.id}'`;
    /*envoi de la requête au serveur sql*/
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            throw error;
        }
        /*création de l'objet post à partir du résultat de la requête sql*/
        const post = result[0];
        /*suppression de l'image du post du dossier 'images'*/
        const filename = post.img_url.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            /*création de la requête sql pour supprimer le post dans la base de données dont l'id est fourni par 
            les paramètres de la requête*/
            const sqlDeleteOnePost = `DELETE FROM posts WHERE id = '${req.params.id}' AND author = '${res.locals.userId}'`;
            /*envoi de la requête au serveur sql*/
            groupomaniaDBConnect.query(sqlDeleteOnePost, (error, result) => {
                if (error) {
                    throw error;
                }
                /*envoi du message de validation de la suppression du post*/
                res.status(200).json({
                    message: "post supprimé."
                });
            });

        });
    });
};