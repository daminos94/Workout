import express from "express";
import { getBodyPart, getExercicesByBodyPart } from "../controllers/exercice.controller.js";

const router = express.Router();

router.get("/bodypart", getBodyPart);
router.get("/:bodyPart", getExercicesByBodyPart);

export default router;