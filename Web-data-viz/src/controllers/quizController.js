var quizModel = require("../models/quizModel");

function getQuiz(req, res) {
    var id = req.params.id;

    let response;
    let quizInfo;
    let questions = [];
    let answers = [];

    quizModel.getQuiz(id)
    .then(quiz => {
        
        quizInfo = {
            id:quiz[0].id,
            userId:quiz[0].userId,
            theme:quiz[0].theme,
            title:quiz[0].title,
            description:quiz[0].description,
            createdAt:quiz[0].createdAt,
        }

        let ids = [];

        for(let i = 0; i < quiz.length; i++){
                let question = {
                        id:quiz[i].questionId,
                        quizId:quiz[i].quizId,
                        question:quiz[i].question,
                        answers: []
                    }

                if(!ids.includes(question.id)){
                    ids.push(question.id);
                    questions.push(question);
                }

                answers.push(
                    {
                        id:quiz[i].answerId,
                        questionId:quiz[i].questionId,
                        text:quiz[i].text,
                        isRight:quiz[i].isRight
                    }
                )
        }

        for(let i = 0; i < answers.length; i++) {
            let id = answers[i].questionId;

            for(let j = 0; j < questions.length; j++){
                    if(questions[j].id == id){
                        questions[j].answers.push(answers[i]);
                    }
            }
        }

        response = quizInfo;
        response.questions = questions;

        res.send(response);
    })
    .catch(err => {
        console.log(err)
        res.send("Erro ao pesquisar Quiz").status(500)
    })
}

module.exports = {
    getQuiz
}
