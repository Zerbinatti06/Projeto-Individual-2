const { response } = require("express");
var dashboardModel = require("../models/dashboardModel");

function getKpis(req, res){
    let id = req.params.id;

    dashboardModel.getKpis(id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send("Erro ao pegar kpis");
    })
}

function getDifference(req, res){
    let id = req.params.id;

    dashboardModel.getDifference(id)
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send("Erro ao pegar diferença (acertos x erros)")
    })
}

function lastMatches(req, res){
    let id = req.params.id;

    dashboardModel.lastMatches(id)
    .then(response => {
        res.status(200).send(response)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send("Erro ao pegar Partidas")
    })
}

function getRanking(req, res){
    dashboardModel.getRanking()
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send("Erro ao pegar ranking")
    })
}


module.exports = {
    getKpis,
    getDifference,
    lastMatches,
    getRanking
}