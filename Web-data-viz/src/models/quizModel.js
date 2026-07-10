var database = require("../database/config")

function getQuiz(id) {
    var sql = `
        SELECT * FROM quiz q
        JOIN question qu on q.id = qu.quizId
        JOIN answer a on qu.id = a.questionId
        WHERE q.id = ${id};
    `;

    return database.executar(sql);
}

module.exports = {
    getQuiz
};