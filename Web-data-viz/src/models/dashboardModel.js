var database = require("../database/config")

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

function getDifference(id){
    var sql = `
        SELECT
        SUM(${'`right`'}) AS rights,
        SUM(wrong) AS wrongs
        FROM play
        WHERE userId = ${id};
    `;

    return database.executar(sql)
}

function lastMatches(id){
    let sql = `
        SELECT
        id,
        startedAt,
        ${'`right`'},
        wrong
        FROM play
        WHERE userId = ${id}
        ORDER BY startedAt
        LIMIT 5;
    `

    return database.executar(sql);
}

function getRanking(){
    let sql = `
        SELECT
            u.id,
            u.name,
            SUM(p.${'`right`'}) AS points,
            COUNT(p.id) AS plays
        FROM user u
        JOIN play p
            ON u.id = p.userId
        GROUP BY
            u.id,
            u.name
        ORDER BY
            points DESC
        LIMIT 10;
    `

    return database.executar(sql);
}

module.exports = {
    getKpis,
    getDifference,
    lastMatches,
    getRanking
};