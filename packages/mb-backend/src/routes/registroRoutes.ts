// registroRoutes.ts
import express from "express";
import { getRegistros, adicionarRegistro, removerRegistro } from "../controllers/registroController";

const router = express.Router();

router.get("/", getRegistros);
router.post("/", adicionarRegistro);
router.delete("/:id", removerRegistro);

export { router as registroRoutes };
