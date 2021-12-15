// (verification tokens)
const jwt = require('jsonwebtoken');

//import des variables d'environnement
const dotenv = require("dotenv");
dotenv.config();

// middleware a appliquer à nos routes sauces à proteger
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.userProfil.token;
    // on decode le token avec fonction verify de jwt et le token et sa clé secrète en argument
    const decodedToken = jwt.verify(token, process.env.GROUPOMANIA_SECRET_KEY);
    // on recupere le userId contenu dans le token décodé
    const userId = decodedToken.userId;
    res.locals.userId = userId;
    next();
  } catch (error) {
    res.status(401).json({error: new Error("non autorisé")});
  }

};