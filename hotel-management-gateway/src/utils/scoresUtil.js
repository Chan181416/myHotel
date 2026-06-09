// משקלים לכל קריטריון
const SCORE_WEIGHTS = {
    seaView: 80,       // מול הים
    doubleRoom: 40,    // חדר זוגי
    capacityMatch: 20 // התאמה לגודל האורחים
   
};

// פונקציה לחישוב ציון התאמה של חדר להזמנה
function calculateScore(room, request) {
    let score = 0;

    // חובה: אם החדר לא פנוי בתאריכים או לא מתאים בקיבולת → החדר לא מתאים
    if (!room.isAvailable(request.startDate, request.endDate)) {
        return 0;
    }
    if (room.capacity < request.guests) {
        return 0;
    }

    // קריטריונים עם ניקוד
    if (request.seaView && room.seaView) {
        score += SCORE_WEIGHTS.seaView;
    }
    if (request.doubleRoom && room.type === 'double') {
        score += SCORE_WEIGHTS.doubleRoom;
    }
    if (room.capacity === request.guests) {
        score += SCORE_WEIGHTS.capacityMatch;
    }
    

    return score;
}

// ייצוא הפונקציה והמשקלים
module.exports = {
    calculateScore,
    SCORE_WEIGHTS
};