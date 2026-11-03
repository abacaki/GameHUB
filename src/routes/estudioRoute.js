import {Router} from "express";
import * as estudioController from "../controllers/estudioController.js";
import {validarId} from "../middlewares/validarId.js";

const router = Router();

app.get("/estudios", estudioController.listar);
app.get("/estudios/:id", validarId, estudioController.buscarPorId);
app.post("/estudios", estudioController.criar);
app.put("/estudios/:id", validarId, estudioController.atualizar);
app.delete("/estudios/:id", validarId, estudioController.excluir);

export default router;