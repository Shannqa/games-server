import Game from "../models/gameSchema.js";
import Score from "../models/scoreSchema.js";
import { body, validationResult } from "express-validator";

export const scores_get = async (req, res) => {
  try {
    const brickshooter = await Game.findOne({ name: "brickshooter" }).exec();
    const minesweeper = await Game.findOne({ name: "minesweeper" }).exec();
    const scoresBS = await Score.find({ game: brickshooter._id })
      .sort({ score: -1 })
      .limit(25)
      .exec();
    const scoresMS = await Score.find({ game: minesweeper._id })
      .sort({ score: -1 })
      .limit(25)
      .exec();

    console.log(scoresBS);
    if (!brickshooter && !minesweeper) {
      res.status(500).json({ msg: "No highscores found." });
    } else if (brickshooter && minesweeper) {
      res.status(200).json({ brickshooter: scoresBS, minesweeper: scoresMS });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

export const scores_post = [
  body("name", "Cant be empty").trim().isLength({ min: 1, max: 60 }).escape(),
  body("game").trim().isLength({ min: 1, max: 60 }).escape(),
  body("score", "Cant be empty").trim().escape(),
  async (req, res) => {
    try {
      const game = await Game.findOne({ name: req.body.game }).exec();
      if (!game) {
        res.status(500).json({ error: "No games found." });
      }
      let body = { game: game._id, name: req.body.name, score: req.body.score };
      const highscore = new Score(body);
      await highscore.save();
      console.log(highscore);
      res.status(200).json({ success: "success" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err });
    }
  },
];
