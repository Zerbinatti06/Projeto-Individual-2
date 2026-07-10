var quizModel = require("../models/quizModel");

function getQuiz(req, res) {
    var id = req.params.id;

    quizModel.getQuiz(id)
    .then(response => {
        res.json(response).status(200);
        console.log("quiz enviado com sucesso" + response);
    })
    .catch(err => {
        console.log(err)
        res.send("Erro ao pesquisar Quiz").status(500)
    })
}

module.exports = {
    getQuiz
}