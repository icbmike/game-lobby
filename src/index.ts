import { createGameLobbyServer } from "./gameLobbyServer";

const server = createGameLobbyServer({ port: 3001 });

server.start();
