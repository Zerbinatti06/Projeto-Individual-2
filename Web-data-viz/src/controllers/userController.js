var userModel = require("../models/userModel");

function verify(req, res) {
    var email = req.body.email;
    var pass = req.body.pass;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        return;
    }
    
    if (pass == undefined) {
        res.status(400).send("Sua senha está indefinida!");
        return;
    } 

    userModel.verify(email, pass)
        .then(response => {
                res.send(response).status(200)
            }
        ).catch(err => {
                console.log(err);
                console.log("/nHouve um erro ao realizar o login! Erro: ", err.sqlMessage);
                res.status(500).json(err.sqlMessage);
            }
        );
    

}

function register(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var pass = req.body.pass;

    if (username == undefined) {
        res.status(400).send("Seu nome está undefined!");
        return;
    }

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
        return;
    }
    
    if (pass == undefined) {
        res.status(400).send("Sua senha está undefined!");
        return;
    }

    userModel.verify(email, pass)
    .then(response => {
        if(response.length > 0){
            res.json(response);
            console.log("Esse email já está cadastrado")
            
            return;
        }

        userModel.register(username, email, pass)
        .then(response => {
            res.json(response).status(200)
            console.log("Email cadastrado com sucesso")
        })
        .catch(err => {
            res.status(500).send(err)
        })
    })
    .catch(err => {
        res.status(500).send(err)
    })
}

module.exports = {
    verify,
    register
}