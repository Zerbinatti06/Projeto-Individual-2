var database = require("../database/config")

function verify(email, password) {
    var sql = `
        SELECT id, email, name FROM user WHERE email = '${email}' AND password = '${password}'
    `;

    return database.executar(sql);
}

function register(name, email, password) {
    var sql = `
        INSERT INTO user (name, email, password) VALUES ('${name}', '${email}', '${password}');
    `;

    return database.executar(sql);
}

module.exports = {
    verify,
    register
};