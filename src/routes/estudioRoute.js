import {Router} from "express";
import * as estudioController from "../controllers/estudioController.js";
import {validarId} from "../middlewares/validarId.js";

const router = Router();

router.get("/estudios", estudioController.listar);
router.get("/estudios/:id", validarId, estudioController.buscarPorId);
router.post("/estudios", estudioController.criar);
router.put("/estudios/:id", validarId, estudioController.atualizar);
router.delete("/estudios/:id", validarId, estudioController.excluir);

export default router;