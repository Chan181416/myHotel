// services/bookingService.js
const csharpApi = require("../repositories/csharpApi");
const eventMap = require("../utils/eventMap");
const { calculateScore } = require("../utils/scoreUtil");

// סף מינימום להתאמה מלאה
const MINIMUM_MATCH_SCORE = 80;

async function processBooking(request) {
    // שלב 1: שליפת חדרים פנויים
    const availableRooms =
        await csharpApi.getAvailableRoomsByEvent(request.event);
    console.log("חדרים פנויים בתאריכים:", availableRooms.length);

    const filteredRooms =
        availableRooms.filter(room => {

            // התאמת כמות אורחים
            if (room.capacity < request.guests) {
                return false;
            }

            // מול הים
            if (
                request.seaView &&
                !room.seaView
            ) {
                return false;
            }

            return true;
        });

    console.log(
        "חדרים לאחר סינון בסיסי:",
        filteredRooms.length
    );
    // פרטי ההזמנה שהגיעו מהלקוח
    const bookingDetails = {
        guests: request.guests,
        event: request.event,
        eventParts: eventMap[request.event] || [],

        seaView: request.seaView,
        doubleRoom: request.doubleRoom,

        preferredFloor: request.preferredFloor,
        accessibility: request.accessibility
    };
    console.log("התקבלה הזמנה:");
    console.log(bookingDetails);
    const roomOptions = splitGuestsIntoRooms(request.guests, bookingDetails, filteredRooms);
    console.log("אפשרויות חלוקה של אורחים לחדרים עם ניקוד:", roomOptions);

    //  חישוב ציונים לכל חדר פנוי
    const scoredRooms = filteredRooms.map(room => {
        const score = calculateScore(room, bookingDetails);
        return { room, score };
    });

    //  מציאת החדר עם הציון הגבוה ביותר
    let bestRoom = null;
    let highestScore = -1;

    for (const entry of scoredRooms) {
        if (entry.score > highestScore) {
            highestScore = entry.score;
            bestRoom = entry.room;
        }
    }

    //   בדיקת סף והחזרת תוצאה
    if (bestRoom && highestScore >= MINIMUM_MATCH_SCORE) {
        //  התאמה מלאה
        console.log("נמצאה התאמה מלאה");
        return {
            success: true,
            type: "exact-match",
            room: bestRoom,
            score: highestScore
        };
    } else if (bestRoom) {
        //  חלופה קרובה
        console.log("לא נמצאה התאמה מלאה, מוצעת חלופה");
        return {
            success: false,
            type: "alternative",
            alternativeRoom: bestRoom,
            score: highestScore,
            message: "לא נמצאה התאמה מלאה. נמצאה חלופה קרובה."
        };
    } else {
        //  אין חדרים מתאימים בכלל
        console.log("לא נמצאו חדרים מתאימים");
        return {
            success: false,
            type: "no-match",
            message: "לא נמצאו חדרים מתאימים."
        };
    }
}

function splitGuestsIntoRooms(guests, request, availableRooms) {
    const options = [];

    // שלב 1: מגדירים גדלים אפשריים של חדרים
    const roomSizes = [5, 4, 2]; // אפשר להתאים לפי החדרים שלך

    // פונקציה רקורסיבית לבניית קומבינציות
    function buildCombination(remainingGuests, currentCombo) {
        if (remainingGuests <= 0) {
            options.push([...currentCombo]);
            return;
        }
        for (let size of roomSizes) {
            if (size <= remainingGuests) {
                currentCombo.push(size);
                buildCombination(remainingGuests - size, currentCombo);
                currentCombo.pop();
            }
        }
    }

    buildCombination(guests, []);

    // שלב 2: חישוב ניקוד לכל קומבינציה
    const scoredOptions = options.map(combo => {
        let score = 0;

        // ניקוד: פחות חדרים = יותר נקודות
        score += (100 - combo.length * 10);

        // ניקוד: חדרים זוגיים שמורים למי שביקש זוגי
        if (request.doubleRoom) {
            let doubleRoomsInCombo = combo.filter(s => s === 2).length;
            score += doubleRoomsInCombo * 20;
        }

        // ניקוד: אפשר לשלב גם קריטריונים נוספים כמו מול הים וכו'
        if (request.seaView) {
            // מניחים שיש חדרים מול הים במערך
            let seaViewRooms = combo.filter(s => s >= 1).length; // דוגמה
            score += seaViewRooms * 10;
        }

        const advantages = [];
        const disadvantages = [];

        // פחות חדרים
        if (combo.length <= 2) {
            advantages.push("מעט חדרים");
        } else {
            disadvantages.push("פיצול למספר חדרים");
        }

        // שימוש בחדר זוגי
        const doubleRoomsInCombo =
            combo.filter(s => s === 2).length;

        if (request.doubleRoom && doubleRoomsInCombo > 0) {
            advantages.push("כולל חדר זוגי");
        }

        // מול הים
        if (request.seaView) {
            advantages.push("כולל אפשרות למול הים");
        }

        // בזבוז מקום
        const totalCapacity =
            combo.reduce((a, b) => a + b, 0);

        const waste =
            totalCapacity - request.guests;

        if (waste >= 3) {
            disadvantages.push("בזבוז מקום גבוה");

            score -= 15;
        }

        // יותר מדי חדרים
        if (combo.length >= 4) {
            score -= 20;
        }

        return {
            combo,
            score,
            advantages,
            disadvantages
        };
    });

    // שלב 3: סידור לפי ניקוד יורד
    scoredOptions.sort((a, b) => b.score - a.score);

    return scoredOptions.slice(0, 5);
}

module.exports = { processBooking };