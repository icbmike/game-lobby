import dayjs from "dayjs";
import { cyan, yellow } from "colors/safe";
import { BaseLobbyStore } from "./lobbyStore";

export interface ExpirationOptions {
    maxAgeHours: number;
    checkFrequencyMinutes: number;
}

export const startJob = ({ maxAgeHours, checkFrequencyMinutes }: ExpirationOptions, store: BaseLobbyStore) => {
    setInterval(() => {
        console.log(cyan(`Running job: cleanup expired lobbies`))
        const now = dayjs();

        const expiredLobbies = store.getLobbies().filter(l => now.diff(dayjs(l.createdDate), 'hours') >= maxAgeHours);

        expiredLobbies.forEach(l => {
            console.log(yellow(`Removing expired lobby ${l.code}`))
            store.removeLobby(l.code);
        })
    }, checkFrequencyMinutes * 60 * 1000);
};