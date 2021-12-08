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

    //récupération de tous les posts présents dans la base de données
    const sqlGetPosts = `SELECT * FROM posts`;
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            throw error;
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
            throw error;
        }
        res.status(200).json({
            result
        });
        console.log("post récupéré de la base données.");
    });
};

//controller pour créer un post
exports.createOnePost = (req, res, next) => {
    const sqlCreateOnePost = `INSERT INTO posts (title, subject, img_url, author) VALUES ('${req.body.title}', '${req.body.subject}', '${req.protocol}://${req.get('host')}/images/${req.files[0].filename}', ${req.body.author})`;
    groupomaniaDBConnect.query(sqlCreateOnePost, (error, result) => {
        if(error) {
            throw error;
        }
        res.status(200).json({
            result
        });
    });
};

//controller pour modifier un post
exports.modifyOnePost = (req, res, next) => {
    const sqlModifyOnePost = `UPDATE posts SET title = '${req.body.title}', subject = '${req.body.subject}', img_url = '${req.protocol}://${req.get('host')}/images/${req.files[0].filename}' WHERE id = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlModifyOnePost, (error, result) => {
        if(error) {
            throw error;
        }
        res.status(200).json({
            result
        });
    });
};

//controller pour supprimer un post
exports.deleteOnePost = (req, res, next) => {
    const sqlGetPosts = `SELECT * FROM posts WHERE id = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlGetPosts, (error, result) => {
        if (error) {
            throw error;
        }
        const filename = result[0].img_url.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
            const sqlDeleteOnePost = `DELETE FROM posts WHERE id = '${req.params.id}'`;
            groupomaniaDBConnect.query(sqlDeleteOnePost, (error, result) => {
                if(error) {
                    throw error;
                }
                res.status(200).json({
                    result
                });
            });
                 
        });
    });
};