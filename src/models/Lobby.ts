export interface Player {
    name: string;
    id: string;
}

export interface Lobby {
    code: string;
    players: Player[];
    lobbySize?: number;
    createdDate: Date;
    isLocked: boolean;
}

export interface LobbyAdditionalData {
    lobbyCode: string;
}

export interface PlayerAdditionalData {
    playerId: string;
}