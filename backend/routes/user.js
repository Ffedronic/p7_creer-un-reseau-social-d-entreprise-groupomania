//import express
const express = require("express");

//création du router
const router = express.Router();

//import du controller user
const userCtrl = require('../controllers/user');

//route pour l'inscription d'un utilisateur à l'application
router.post('/signup', userCtrl.signUp);

//route pour la connexion d'un utilisateur à l'application
router.post('/signin', userCtrl.signIn);

//route pour accéder à son profil utilisateur
router.get('/', userCtrl.getMyProfil);

//route pour modifier son profil utilisateur
router.put('/', userCtrl.modifyMyProfil);

//route supprimer mon profil d'utilisateur
router.delete('/', userCtrl.deleteMyProfil);

//route pour voir le profil d'un utilisateur
router.get('/:id', userCtrl.getUserProfil);

//route pour supprimer le profil d'un utilisateur
router.delete('/:id', userCtrl.deleteUserProfil);


module.exports = router;