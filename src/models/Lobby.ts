export interface Player {
    name: string;
    id: string;
}

export interface Lobby {
    code: string;
    players: Player[]
    lobbySize?: number,
    createdDate: Date
}
