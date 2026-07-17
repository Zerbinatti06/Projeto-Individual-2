var database = require("../database/config")

function verify(email, password) {
    var sql = `
        SELECT id, email, name FROM user 
        WHERE email = '${email}' AND password = '${password}'
    `;

    return database.executar(sql);
}

function register(name, email, password) {
    var sql = `
        INSERT INTO user (name, email, password) 
        VALUES ('${name}', '${email}', '${password}');
    `;

    return database.executar(sql);
}

function registerPlay(id, quizId, wrong, right){
    var sql = `
        INSERT INTO play (userId, quizId, wrong, ${'`right`'})
        VALUES (${id}, ${quizId}, ${wrong}, ${right});
    `

    return database.executar(sql);
}

function registerPlayAnswer(playId, questionId, answerId){
    var sql = `
        INSERT INTO play_answer (playId, questionId, answerId)
        VALUES (${playId}, ${questionId}, ${answerId});
    `

    return database.executar(sql);
}

function getKpis(id){
    var sql = `
        SELECT
        COUNT(*) AS totalPlays,
        ROUND(AVG((${'`right`'} / (${'`right`'} + wrong)) * 100),0) AS accuracy,
        MAX(${'`right`'}) AS bestScore
        FROM play
        WHERE userId = ${id};
    `

    return database.executar(sql);
}

module.exports = {
    verify,
    register,
    registerPlay,
    registerPlayAnswer,
    getKpis
};