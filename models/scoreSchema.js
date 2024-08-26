import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  name: { type: String, default: "Annonymous", required: true },
  score: { type: Number, required: true },
});

const Score = mongoose.model("Score", ScoreSchema);

export default Score;
