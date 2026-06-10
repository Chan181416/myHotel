// utils/scoreUtil.ts

export const SCORE_WEIGHTS = {
    seaView: 80,
    exactCapacity: 20,
    nearCapacity: 10
};

export function calculateScore(
    room: any,
    request: any
): number {

    let score = 0;

    // הגנה בסיסית
    if (!room) {
        return 0;
    }

    // לא מספיק מיטות
    if (room.sumbed < request.guests) {
        return 0;
    }

    // מול הים
    if (
        request.seaView === true &&
        room.condition?.option === "מול הים"
    ) {
        score += SCORE_WEIGHTS.seaView;
    }

    // התאמה מדויקת לכמות אורחים
    if (room.sumbed === request.guests) {
        score += SCORE_WEIGHTS.exactCapacity;
    }

    // חדר גדול יותר אבל עדיין סביר
    else if (
        room.sumbed > request.guests &&
        room.sumbed - request.guests <= 2
    ) {
        score += SCORE_WEIGHTS.nearCapacity;
    }

    return score;
}