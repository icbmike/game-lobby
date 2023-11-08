import express from "express";
import { cyan } from "colors/safe";
import { configureLobbyHandlers } from "./endpoints/lobbies";
import { startJob } from "./lobbyExpirationJob";
import morgan from 'morgan';

export interface CreateGameLobbyServerOptions {
  port: number;
}

export const createGameLobbyServer = ({ port }: CreateGameLobbyServerOptions) => {
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));

  app.get("/ping", (req, res) => {
    res.status(200).send("Alive!");
  });

  configureLobbyHandlers(app);

  return {
    start: () => {
      // start expiration job
      startJob();

      // Start app
      console.log(cyan(`Running on port ${port}`));
      app.listen(port);
    }
  }
}