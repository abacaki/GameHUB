import {Router} from "express";
import * as jogosController from "../controllers/jogosController.js";
import {validarId} from "../middlewares/validarId.js";

const router = Router();

app.get("/jogos", jogosController.listar);
app.get("/jogos/:id", validarId, jogosController.buscarPorId);
app.post("/jogos", jogosController.criar);
app.put("/jogos/:id", validarId, jogosController.atualizar);
app.delete("/jogos/:id", validarId, jogosController.excluir);

export default router;