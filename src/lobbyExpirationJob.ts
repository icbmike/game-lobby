import dayjs from "dayjs";
import { getLobbies, removeLobby } from "./lobbyStore";
import { cyan, yellow } from "colors/safe";

export const startJob = () => {
    setInterval(() => {
        console.log(cyan(`Running job: cleanup expired lobbies`))
        const now = dayjs();

        const expiredLobbies  = getLobbies().filter(l => now.diff(dayjs(l.createdDate), 'hours') >= 12);

        expiredLobbies.forEach(l => {
            console.log(yellow(`Removing expired lobby ${l.code}`))
            removeLobby(l.code);
        })
    }, 30 * 60 * 1000);
};