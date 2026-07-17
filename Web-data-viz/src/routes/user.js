var express = require("express");
var router = express.Router();

var userController = require("../controllers/userController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/register", function (req, res) {
    userController.register(req, res);
})

router.post("/verify", function (req, res) {
    userController.verify(req, res);
});

router.post("/register/play", function (req, res) {
    userController.registerPlay(req, res);
});

router.post("/register/answer", function (req, res) {
    userController.registerPlayAnswer(req, res);
});

module.exports = router;