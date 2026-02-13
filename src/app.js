import server from "./server.js";

import express from "express";
import createError from "http-errors";
import bodyParser from "body-parser";
import cors from "cors";

import usersRoutes from "./routes/user.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(usersRoutes);

app.use((_req, _res, next) => {
  next(createError(404));
});

app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    status: err.state,
    message: err.message || "An unknown error occurred.",
  });
});

server
  .then(() => {
    app.listen(port, () => {
      console.log(`Connected to Server. Listening on port ${port}`);
    });
  })
  .catch((err) => console.error("Error connecting to Server: ", err));
