import { green } from "colors/safe";
import { Lobby } from "./models/Lobby";

let lobbies: Lobby[] = [];

export const getLobbies = () => lobbies;

export const getLobby = (code: string) => lobbies.find((l) => l.code === code);

const lobbyCodeCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

const newLobbyCode = () =>
  Array.from({ length: 5 })
    .map((_) => lobbyCodeCharacters[Math.floor(Math.random() * lobbyCodeCharacters.length)])
    .join("");

export const newLobby = (lobbySize?: number) => {
    const newLobby: Lobby = {
        code: newLobbyCode(),
        players: [],
        lobbySize: lobbySize,
        createdDate: new Date()
      };

      lobbies.push(newLobby);
  
      console.log(green(`New lobby: ${newLobby.code}`));

    return newLobby;
}

export const removeLobby = (code: string) => {
  lobbies = lobbies.filter(l => l.code !== code);
};