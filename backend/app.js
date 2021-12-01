//import d'express
const express = require('express');

//import dotenv
const dotenv = require('dotenv');
dotenv.config();

//import mysql
const mysql = require('mysql');

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

//route test
app.use((req, res, next) => {
    res.status(200).json({ message: "requête reçue." });
    next();
});

//export du module app
module.exports = app;