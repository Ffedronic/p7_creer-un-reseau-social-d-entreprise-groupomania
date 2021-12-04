//import express
const express = require("express");

//création du router
const router = express.Router();

//import du controller user
const postsCtrl = require('../controllers/posts');

//route pour récupérer tous les posts de la base de données
router.get('/', postsCtrl.getPosts);

//route pour récupérer un post de la bas de données
router.get('/:id', postsCtrl.getOnePost);

//route pour créer un post
router.post('/', postsCtrl.createOnePost);

//route pour modifier un post
router.put('/:id', postsCtrl.modifyOnePost);

//route pour supprimer un post
router.delete('/:id', postsCtrl.deleteOnePost);

module.exports = router;