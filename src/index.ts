import express from "express";
import { cyan } from "colors/safe";
import { configureHandlers } from "./endpoints/lobbies";
import { startJob } from "./lobbyExpirationJob";
import morgan from 'morgan';

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.get("/ping", (req, res) => {
  res.status(200).send("Alive!");
});

configureHandlers(app);

// start expiration job
startJob();

// Start app
const port = 3001;
console.log(cyan(`Running on port ${port}`));
app.listen(port);
