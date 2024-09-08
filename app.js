import createError from "http-errors";
import express from "express";
import logger from "morgan";
import path from "path";
import __dirname from "./utils/dirname.js";
import cookieParser from "cookie-parser";
import scoresRouter from "./routes/scoresRouter.js";
import connectDB from "./config/db.js";
import MongoStore from "connect-mongo";
import cors from "cors";

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

connectDB();
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: "GET,POST,PUT,DELETE",
    credentials: false,
  })
);

app.use("/api/scores", scoresRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
  // res.render("error");
});

export default app;
