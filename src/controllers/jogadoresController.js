import * as jogadoresModels from "../models/jogadoresModel.js";
import {textoValido} from "../utils/validacoes.js";

export function listar(req, res, next) {
    jogadoresModels.listar((erro, resultado) => {
        if (erro) return next(erro);
        return res.status(200).json(resultado);
    });
};

export function buscarPorId(req, res, next) {
    jogadoresModels.buscarPorId(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.length === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json(resultado[0]);
    });
};

export function criar(req, res, next) {
    const { nome, email, nickname } = req.body ?? {};
    if (!textoValido(nome, 100) || !textoValido(email, 150)
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        || !textoValido(nickname, 20)
        || !/^[A-Za-z0-9_]{3,20}$/.test(nickname.trim())) {
        return res.status(400).json({
            erro: "Informe nome (até 100 caracteres), email válido (até 150) e nickname com 3 a 20 letras, números ou sublinhado"
        });
    }
    const dados = { nome: nome.trim(), email: email.trim(), nickname: nickname.trim() };

    jogadoresModels.criar(dados, (erro, resultado) => {
        if (erro) return next(erro);
        return res.status(201).json({
            mensagem: "Jogador cadastrado com sucesso",
            id: resultado.insertId
        });
    });
};

export function atualizar(req, res, next) {
    const { nome, email, nickname } = req.body ?? {};
    if (!textoValido(nome, 100) || !textoValido(email, 150)
        || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
        || !textoValido(nickname, 20)
        || !/^[A-Za-z0-9_]{3,20}$/.test(nickname.trim())) {
        return res.status(400).json({
            erro: "Informe nome (até 100 caracteres), email válido (até 150) e nickname com 3 a 20 letras, números ou sublinhado"
        });
    }
    const dados = { nome: nome.trim(), email: email.trim(), nickname: nickname.trim() };

    // Consulta didática para confirmar que o registro existe antes de editar.
jogadoresModels.atualizar(req.id, dados, (erro, resultado) => {
    if (erro) return next(erro);
    
    // Se 0 linhas foram afetadas, significa que o ID não existia no banco
    if (resultado.affectedRows === 0) {
        return res.status(404).json({ erro: "Jogador não encontrado" });
    }
    
    return res.status(200).json({ mensagem: "Jogador atualizado com sucesso" });
});
};

export function excluir(req, res, next) {
    jogadoresModels.excluir(req.id, (erro, resultado) => {
        if (erro) return next(erro);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: "Jogador não encontrado" });
        }
        return res.status(200).json({ mensagem: "Jogador excluído com sucesso" });
    });
};