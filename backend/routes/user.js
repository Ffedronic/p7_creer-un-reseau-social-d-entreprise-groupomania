//import express
const express = require("express");

//création du router
const router = express.Router();

//import du controller user
const userCtrl = require('../controllers/user');

//route pour la redirection de l'utilisateur vers la page d'inscription
router.get('/signup', userCtrl.renderSignUp);

//route pour la redirection de l'utilisateur vers la page de connexion
router.get('/login', userCtrl.renderLogin);

//route pour l'inscription d'un utilisateur à l'application
router.post('/signup', userCtrl.signUp);

//route pour la connexion d'un utilisateur à l'application
router.post('/login', userCtrl.login);

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