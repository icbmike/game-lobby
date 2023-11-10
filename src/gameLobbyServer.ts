import express, { Express } from "express";
import { cyan } from "colors/safe";
import { configureLobbyHandlers as configureBaseLobbyHandlers } from "./endpoints/lobbies";
import { ExpirationOptions, startJob } from "./lobbyExpirationJob";
import morgan from 'morgan';
import { LobbyAdditionalData, PlayerAdditionalData } from "./models/Lobby";
import { configureAdditionalDataHandlers } from "./endpoints/additionalData";
import { createStore } from "./lobbyStore";

export interface CreateGameLobbyServerOptions {
  port: number;
  expirationOptions: ExpirationOptions
  configureHandlers: (app: Express) => void;
}

export const createGameLobbyServer = <TLobbyAdditionalData extends LobbyAdditionalData, TPlayerAdditionalData extends PlayerAdditionalData>({
  port = 3000,
  expirationOptions = {
    maxAgeHours: 12,
    checkFrequencyMinutes: 30
  },
  configureHandlers = () => { }
}: Partial<CreateGameLobbyServerOptions>) => {
  const store = createStore<TLobbyAdditionalData, TPlayerAdditionalData>();
  const app = express();

  app.use(express.json());
  app.use(morgan('dev'));

  app.get("/ping", (req, res) => {
    res.status(200).send("Alive!");
  });

  configureBaseLobbyHandlers(app, store);
  configureAdditionalDataHandlers<TLobbyAdditionalData, TPlayerAdditionalData>(app, store);
  configureHandlers(app);

  return {
    start: () => {
      // start expiration job
      startJob(expirationOptions, store);

      // Start app
      console.log(cyan(`Running on port ${port}`));
      app.listen(port);
    },
    express: app
  }
}