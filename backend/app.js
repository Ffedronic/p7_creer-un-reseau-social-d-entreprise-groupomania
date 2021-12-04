//import d'express
const express = require('express');

//import dotenv
const dotenv = require('dotenv');
dotenv.config();

//import mysql
const mysql = require('mysql');

// import helmet
const helmet = require('helmet');

//import du router user
const userRouter = require('./routes/user');

//import du router posts
const postsRouter = require('./routes/posts');

//import du router comments
const commentsRouter = require('./routes/comments');

//connexion à la base données sql
const groupomaniaDBConnect = mysql.createConnection({
    host: process.env.GROUPOMANIA_HOSTNAME,
    user: process.env.GROUPOMANIA_USERNAME,
    password: process.env.GROUPOMANIA_USERPASSWORD
});
groupomaniaDBConnect.connect((error) => {
    if(error) {
        throw error;
    }
    console.log('connexion sql réussie');
});

//création de l'application express
const app = express();

// middleware pour supprimer la sécurité CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});

//middleware helmet
app.use(helmet())

//middleware global, transforme le corps de la requete en objet javascript utilisable
app.use(express.json());

//Utilisation du router user pour la gestion des utilisateurs de l'application 
app.use('/api/auth', userRouter);

//Utilisation du router posts pour la gestion des posts de l'application
app.use('api/posts', postsRouter);

//Utilisation du router comments pour la gestion des commentaires sur les posts issus de l'application
app.use('/api/posts/:id/comments', commentsRouter);

//export du module app
module.exports = app;