require("dotenv").config();
const express = require("express");
const conexao = require("./db.js");
const PORTA = Number(process.env.PORTA);
const app = express();

function validarId(req, res, next){
    const id = Number(req.params.id);
    if(!/^\id+$/.test(req.params.id) || !Number.isSafeInteger(id) || id < 0){
        return res.status(400).json({erro: "O id deve ser um número inteiro positivo"});
    }
    req.id = id;
    next();
}

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "API funcionando" });
});

app.get("/estudios", (req, res, next) => {
    conexao.query("SELECT * FROM estudios ORDER BY id", (erro, resultado)=>{
        if(erro)return next(erro);
        return res.status(200).json(resultado);
    })
});

app.get("/estudios/:id", validarId, (req, res, next) => {
     conexao.query("SELECT * FROM estudios WHERE id=?",[req.id], (erro, resultado)=>{
        if(erro)return next(erro);
        return res.status(200).json(resultado);
    })
});

app.post("/estudios", (req, res, next)=>{});

app.put("/estudios/:id", (req, res)=>{});

app.delete("/estudios/:id", (req, res)=>{});

conexao.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao banco", erro.code || erro.message);
        process.exit(1);
    }
    console.log("Conectando ao banco de dados")
});

const servidor = app.listen(PORTA, () => {
    console.log(`Servidor iniciado em http:localhost:${PORTA}`);
});

servidor.on("error", (erro) => {
    console.error("Erro ao iniciar servidor:", erro.code || erro.message);
    process.exist(1);
});