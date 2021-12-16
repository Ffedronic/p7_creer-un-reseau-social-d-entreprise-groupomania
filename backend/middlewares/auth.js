// (verification tokens)
const jwt = require('jsonwebtoken');

//import des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// middleware a appliquer à nos routes sauces à proteger
module.exports = (req, res, next) => {
  try {
    /* récupération du token issu du cookie userProfil de la requête envoyée par le client*/
    const token = req.cookies.userProfil.token;
    /*récupération du isAdmin issu du cookie userProfil de la requête envoyée par le client*/
    const isAdmin = req.cookies.userProfil.isAdmin;
    /*enregistrement du isAdmin dans un variable locale de réponse*/
    res.locals.isAdmin = isAdmin;
    /*dechiffrement du token avec la fonction verify de jwt, le token, clé secrète*/
    const decodedToken = jwt.verify(token, process.env.GROUPOMANIA_SECRET_KEY);
    /*récupération du userId issu du dechiffrement du token*/
    const userId = decodedToken.userId;
    /*enregistrement du userId dans un variable locale de réponse*/
    res.locals.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("non autorisé")
    });
  }

};