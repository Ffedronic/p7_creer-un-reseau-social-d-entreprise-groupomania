//import mysql
const mysql = require('mysql');

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

    //récupération de tous les posts présents dans la base de données
    const sqlGetPosts = `SELECT * FROM posts`;
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        res.status(200).json({
            result
        });
        console.log("posts récupérés de la base données.");
    });
};

//controller pour récupérer un post de la base de données
exports.getOnePost = (req, res, next) => {

    //récupération de tous les posts présents dans la base de données
    const sqlGetPosts = `SELECT * FROM posts WHERE id = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        res.status(200).json({
            result
        });
        console.log("post récupéré de la base données.");
    });
};

//controller pour créer un post
exports.createOnePost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = {
        title: postObject.title,
        subject: postObject.subject,
        img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        author: postObject.userId
    };
    const sqlCreateOnePost = `INSERT INTO posts (title, subject, img_url, author) VALUES ('${post.title}', '${post.subject}', '${post.img_url}', '${post.author}')`;
    groupomaniaDBConnect.query(sqlCreateOnePost, (error) => {
        res.status(500).json({
            error
        });
    });
    res.status(200).json({
        message: "post créé."
    });

};

//controller pour modifier un post
exports.modifyOnePost = (req, res, next) => {
    const postObject = JSON.parse(req.body.post);
    const post = {
        id: req.params.id,
        title: postObject.title,
        subject: postObject.subject,
        img_url: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        author: postObject.userId
    };
    const sqlModifyOnePost = `UPDATE posts SET title = '${post.title}', subject = '${post.subject}', img_url = '${post.img_url}' WHERE id = '${post.id}'`;
    groupomaniaDBConnect.query(sqlModifyOnePost, (error) => {
        res.status(500).json({
            error
        });
    });
    res.status(200).json({
        message: "post créé."
    });
};

//controller pour supprimer un post
exports.deleteOnePost = (req, res, next) => {
    const sqlGetPosts = `SELECT * FROM posts WHERE id = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        const filename = result.img_url.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            const sqlDeleteOnePost = `DELETE FROM posts WHERE id = '${req.params.id}'`;
            groupomaniaDBConnect.query(sqlDeleteOnePost, (error) => {
                res.status(500).json({
                    error
                });
            });
            res.status(200).json({
                message: "post supprimé."
            });     
        });
    });
};