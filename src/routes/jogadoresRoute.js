import {Router} from "express";
import * as jogadoresController from "../controllers/jogadoresController.js";
import {validarId} from "../middlewares/validarId.js";

const router = Router();

router.get("/jogadores", jogadoresController.listar);
router.get("/jogadores/:id", validarId, jogadoresController.buscarPorId);
router.post("/jogadores", jogadoresController.criar);
router.put("/jogadores/:id", validarId, jogadoresController.atualizar);
router.delete("/jogadores/:id", validarId, jogadoresController.excluir);

export default router;