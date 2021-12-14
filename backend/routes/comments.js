//import express
const express = require("express");

//création du router
const router = express.Router({ mergeParams: true });

//import du controller user
const commentsCtrl = require('../controllers/comments');

//import du middleware d'authentification
const auth = require('../middlewares/auth');

//route pour récupérer tous les commentaires d'un post dont l'id est fourni
router.get('/', commentsCtrl.getComments);

//controller pour créer un commentaire sur un post dont l'id et l'id utilisateur sont fournis
router.post('/', auth, commentsCtrl.createOneComment);

//controller pour modifier un commentaire d'un post dont l'id et l'id utilisateur sont fournis
router.put('/:id', auth, commentsCtrl.modifyOneComment);

//controller pour supprimer un commentaire d'un post dont l'id et l'id utilisateur sont fournis
router.delete('/:id', auth, commentsCtrl.deleteOneComment);

module.exports = router;