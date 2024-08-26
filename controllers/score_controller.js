import Game from "../models/gameSchema.js";
import Score from "../models/scoreSchema.js";
import { body, validationResult } from "express-validator";

export const scores_get = async (req, res) => {
  try {
    const brickshooter = await Score.find({ game: "brickshooter" }).exec();
    const minesweeper = await Score.find({ game: "minesweeper" }).exec();
    if (!brickshooter && !minesweeper) {
      res.status(204).json({ msg: "No highscores found." });
    } else if (brickshooter || minesweeper) {
      res.status(200).json({ brickshooter: brickshooter, minesweeper: minesweeper });
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const scores_post = [
  body()
    .trim()
    .isLength({ min: 1, max: 60 })
    .escape(),
    
  async (req, res) => {
    try {
    let body = { game: req.game, name: req.name, score: req.score, ...req.body }
    
    } catch (err) {
    
    }
  }
]