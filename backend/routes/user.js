//import express
const express = require("express");

//création du router
const router = express.Router();

//import du controller user
const userCtrl = require('../controllers/user');

//import du middleware passwordValidator
const passwordValidator = require('../middlewares/passwordValidator');

//route pour l'inscription d'un utilisateur à l'application
router.post('/signup', passwordValidator, userCtrl.signUp);

//route pour la connexion d'un utilisateur à l'application
router.post('/login', passwordValidator, userCtrl.login);

//route pour accéder à son profil utilisateur
router.get('/myProfil', userCtrl.getMyProfil);

//route pour modifier son profil utilisateur
router.put('/myProfil', userCtrl.modifyMyProfil);

//route supprimer mon profil d'utilisateur
router.delete('/myProfil', userCtrl.deleteMyProfil);

//route pour voir le profil d'un utilisateur
router.get('/:id', userCtrl.getUserProfil);

//route pour supprimer le profil d'un utilisateur
router.delete('/:id', userCtrl.deleteUserProfil);


module.exports = router;