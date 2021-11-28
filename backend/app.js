// import d'express
const express = require('express');

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
    console.log("app fonctionne bien");
    res.status(200).json({ message: "l'app répond bien" });
    next();
});

//export du module app
module.exports = app;