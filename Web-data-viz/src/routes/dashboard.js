var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.get("/kpis/:id", function (req, res) {
    dashboardController.getKpis(req, res);
})

router.get("/difference/:id", function (req, res) {
    dashboardController.getDifference(req, res);
})

router.get("/lastMatches/:id", function (req, res) {
    dashboardController.lastMatches(req, res);
})

router.get("/ranking", function (req, res) {
    dashboardController.getRanking(req, res);
})

module.exports = router;