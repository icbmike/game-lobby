import { Express } from "express";
import { LobbyAdditionalData, PlayerAdditionalData } from "../models/Lobby";
import { LobbyStore } from "../lobbyStore";

export const configureAdditionalDataHandlers = <TLobbyAdditionalData extends LobbyAdditionalData, TPlayerAdditionalData extends PlayerAdditionalData>(app: Express, store: LobbyStore<TLobbyAdditionalData, TPlayerAdditionalData>) => {
  app.get('/lobbies/:code/data', (req, res) => {
    const lobby = store.getLobby(req.params.code);

    if (!lobby) {
      return res.status(404).send('Lobby not found');
    }

    const data = store.getAdditionalLobbyData(req.params.code);

    return res.json(data);
  });

  app.get('/lobbies/:code/players/:playerId/data', (req, res) => {
    const lobby = store.getLobby(req.params.code);

    if (!lobby) {
      return res.status(404).send('Lobby not found');
    }

    const player = lobby.players.find(p => p.id === req.params.playerId);

    if (!player) {
      return res.status(404).send('Player not found');
    }

    const data = store.getAdditionalPlayerData(req.params.playerId);

    return res.json(data);
  });

  app.post('/lobbies/:code/data', (req, res) => {
    const lobby = store.getLobby(req.params.code);

    if (!lobby) {
      return res.status(404).send('Lobby not found');
    }

    const data = req.body as TLobbyAdditionalData;

    store.attachAdditionalLobbyData(req.params.code, data);
  });

  app.post('/lobbies/:code/players/:playerId/data', (req, res) => {
    const lobby = store.getLobby(req.params.code);

    if (!lobby) {
      return res.status(404).send('Lobby not found');
    }

    const player = lobby.players.find(p => p.id === req.params.playerId);

    if (!player) {
      return res.status(404).send('Player not found');
    }

    const data = req.body as TPlayerAdditionalData;

    store.attachAdditionalPlayerData(req.params.playerId, data);
  });
};