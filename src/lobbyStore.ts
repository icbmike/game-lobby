import { green } from "colors/safe";
import { Lobby, LobbyAdditionalData, PlayerAdditionalData } from "./models/Lobby";

const lobbyCodeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const newLobbyCode = () =>
  Array.from({ length: 5 })
    .map((_) => lobbyCodeCharacters[Math.floor(Math.random() * lobbyCodeCharacters.length)])
    .join("");

export interface BaseLobbyStore {
  getLobbies: () => Lobby[];
  getLobby: (lobbyCode: string) => Lobby | undefined;
  newLobby: (lobbySize?: number) => Lobby;
  removeLobby: (lobbyCode: string) => void;
}

export interface LobbyStore<TLobbyAdditionalData extends LobbyAdditionalData, TPlayerAdditionalData extends PlayerAdditionalData> extends BaseLobbyStore {
  attachAdditionalLobbyData: (lobbyCode: string, data: TLobbyAdditionalData) => void;
  attachAdditionalPlayerData: (lobbyCode: string, data: TPlayerAdditionalData) => void;
  getAdditionalLobbyData: (lobbyCode: string) => TLobbyAdditionalData | undefined;
  getAdditionalPlayerData: (playerId: string) => TPlayerAdditionalData | undefined;
}

export const createStore = <TLobbyAdditionalData extends LobbyAdditionalData, TPlayerAdditionalData extends PlayerAdditionalData>(): LobbyStore<TLobbyAdditionalData, TPlayerAdditionalData> => {
  const lobbies: Record<string, Lobby> = {};
  const lobbyAdditionalData: Record<string, TLobbyAdditionalData> = {};
  const playerAdditionalData: Record<string, TPlayerAdditionalData> = {};

  return {
    getLobbies: () => Object.values(lobbies),
    getLobby: (code: string) => lobbies[code],
    newLobby: (lobbySize?: number) => {
      const newLobby: Lobby = {
        code: newLobbyCode(),
        players: [],
        lobbySize: lobbySize,
        createdDate: new Date(),
        isLocked: false
      };

      lobbies[newLobby.code] = newLobby

      console.log(green(`New lobby: ${newLobby.code}`));

      return newLobby;
    },
    removeLobby: (code: string) => {
      lobbies[code].players.forEach(p => {
        delete playerAdditionalData[p.id]
      })

      delete lobbies[code];
      delete lobbyAdditionalData[code];

    },
    attachAdditionalLobbyData(lobbyCode, data) {
      lobbyAdditionalData[lobbyCode] = data;
    },
    attachAdditionalPlayerData(playerId, data) {
      playerAdditionalData[playerId] = data;
    },
    getAdditionalLobbyData(lobbyCode) {
      return lobbyAdditionalData[lobbyCode];
    },
    getAdditionalPlayerData(playerId) {
      return playerAdditionalData[playerId]
    },
  };
};
