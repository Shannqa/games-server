import express from "express";
import { scores_get, scores_post } from "../controllers/score_controller.js";

const router = express.Router();

router.get("/", scores_get);
router.post("/", scores_post);

export default router;
