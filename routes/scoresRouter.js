import express from "express";

const router = express.Router();

router.get("/scores", scores_get);
router.post("/scores", scores_post);

export default router;
