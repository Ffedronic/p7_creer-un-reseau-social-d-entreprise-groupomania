//import mysql
const mysql = require('mysql');

//connexion à la base données sql
const groupomaniaDBConnect = mysql.createConnection({
    host: process.env.GROUPOMANIA_HOSTNAME,
    user: process.env.GROUPOMANIA_USERNAME,
    password: process.env.GROUPOMANIA_USERPASSWORD,
    database: process.env.GROUPOMANIA_DB
});

//controller pour récupérer les commentaires d'un post dont l'id est fourni
exports.getComments = (req, res, next) => {

    //récupération de tous les comments présents dans la base de données pour le post dont l'id est fourni
    const sqlGetComments = `SELECT * FROM comments WHERE post = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlGetComments, (error, result) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        res.status(200).json({
            result
        });
        console.log("commentaires récupérés.");
    });
};

//controller pour créer un commentaire sur un post dont l'id et l'id utilisateur sont fournis
exports.createOneComment = (req, res, next) => {
    const sqlCreateOneComment = `INSERT INTO comments (body, author, post) VALUES ('${req.body.content}', '${req.body.author}', '${req.body.post}')`;
    groupomaniaDBConnect.query(sqlCreateOneComment, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        res.status(200).json({
            message: "commentaires créé."
        });
    });
};

//controller pour modifier un commentaire d'un post dont l'id et l'id utilisateur sont fournis
exports.modifyOneComment = (req, res, next) => {
    const sqlmodifyOneComment = `UPDATE comments SET body = '${req.body.content}', author = '${req.body.author}', post = '${req.body.post}') WHERE id = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlmodifyOneComment, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        res.status(200).json({
            message: "commentaire modifié."
        });
    });
};

//controller pour supprimer un commentaire d'un post dont l'id et l'id utilisateur sont fournis
exports.deleteOneComment = (req, res, next) => {
    const sqlDeleteComment = `DELETE FROM comments WHERE id = '${req.params.id}'`;
    groupomaniaDBConnect.query(sqlDeleteComment, (error) => {
        if (error) {
            res.status(500).json({
                error
            });
        }
        res.status(200).json({
            message: "commentaire supprimé."
        });
    });
};