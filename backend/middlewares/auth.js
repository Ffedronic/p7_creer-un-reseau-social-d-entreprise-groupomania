const jwt = require('jsonwebtoken');
//import dotenv
const dotenv = require('dotenv');
dotenv.config();
module.exports = (req, res, next) => {
    try {
        console.log(req);
        const token = req.cookies.userProfil.userId;
        const decodedToken = jwt.verify(token, process.env.GROUPOMANIA_SECRET_KEY);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
          throw new Error("requête non authentifiée");
        } else {
          next();
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
};