var database = require("../database/config")

function getQuiz(id) {
    var sql = `
        SELECT
            q.id,
            q.userId,
            q.theme,
            q.title,
            q.description,
            q.createdAt,

            qu.id AS questionId,
            qu.quizId,
            qu.question,

            a.id AS answerId,
            a.questionId,
            a.text,
            a.isRight

        FROM Tamarineira.quiz q

        JOIN Tamarineira.question qu
            ON q.id = qu.quizId

        JOIN Tamarineira.answer a
            ON qu.id = a.questionId

        WHERE q.id = ${id};
    `;

    return database.executar(sql);
}

module.exports = {
    getQuiz
};