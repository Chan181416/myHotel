
// // import eventMap from "../utils/eventMap";
// // import { calculateScore } from "../utils/scoreUtil";
// // import { Registereds } from "./types";

// // export function processBookingEngine(
// //   request: any,
// //   rooms: any[],
// //   registeredMap: Map<string, Registereds>,
// //   rank: number = 0
// // ) {
// // function isRoomFree(room: any): boolean {
// //   const bookings = room.bookings || [];

// //   const requestParts = eventMap[request.event] || [];

// //   for (const b of bookings) {
// //     const reg = registeredMap.get(b.registeredsId);
// //     if (!reg) continue;

// //     const occupiedParts = eventMap[reg.event?.event || ""] || [];

// //     const overlap = requestParts.some(part =>
// //       occupiedParts.includes(part)
// //     );

// //     // אם יש חפיפה בין האירועים → החדר לא פנוי להזמנה הזו
// //     if (overlap) {
// //       return false;
// //     }
// //   }

// //   return true;
// // }

// //   const availableRooms = rooms.filter(
// //     (room) =>
// //       room.sumbed >= request.guests &&
// //       isRoomFree(room)
// //   );

// //   const scored = availableRooms.map((room) => ({
// //     room,
// //     score: calculateScore(room, request)
// //   }));

// //   scored.sort((a, b) => b.score - a.score);

// //   if (!scored.length) {
// //     return {
// //       success: false,
// //       type: "no-match"
// //     };
// //   }
// //   // const best = scored[0];

// //   if (rank >= scored.length) {
// //     return {
// //       success: false,
// //       type: "no-match"
// //     };
// //   }

// //   return {
// //     success: true,
// //     type: rank === 0 ? "best-match" : "alternative",
// //     room: scored[rank].room,
// //     score: scored[rank].score
// //   };

// // }
// import eventMap from "../utils/eventMap";
// import { calculateScore } from "../utils/scoreUtil";
// import { Registereds } from "./types";

// /**
//  * בודק אם יש חפיפה בין אירועים של חדר לבקשה חדשה
//  */
// function isRoomFree(room: any, request: any, registeredMap: Map<string, Registereds>): boolean {
//   const bookings = room.bookings || [];

//   const requestParts = eventMap[request.event] || [];

//   for (const b of bookings) {
//     const reg = registeredMap.get(b.registeredsId);
//     if (!reg) continue;

//     const occupiedParts = eventMap[reg.event?.event || ""] || [];

//     const overlap = requestParts.some(part =>
//       occupiedParts.includes(part)
//     );

//     if (overlap) {
//       return false;
//     }
//   }

//   return true;
// }

// /**
//  * מנוע שיבוץ חדרים לפי דירוג + חלוקת guests
//  */
// export function processBookingEngine(
//   request: any,
//   rooms: any[],
//   registeredMap: Map<string, Registereds>
// ) {

//   // ==============================
//   // 1. סינון חדרים פנויים לוגית
//   // ==============================
//   const availableRooms = rooms.filter(room =>
//     isRoomFree(room, request, registeredMap)
//   );

//   // ==============================
//   // 2. דירוג חדרים
//   // ==============================
//   const scored = availableRooms.map(room => ({
//     room,
//     score: calculateScore(room, request)
//   }));

//   scored.sort((a, b) => b.score - a.score);

//   // ==============================
//   // 3. בדיקה שאין בכלל חדרים
//   // ==============================
//   if (scored.length === 0) {
//     return {
//       success: false,
//       type: "no-match",
//       message: "אין חדרים מתאימים לפי חפיפות"
//     };
//   }

//   // ==============================
//   // 4. שיבוץ guests לחדרים
//   // ==============================
//   let remainingGuests = request.guests;
//   const allocations: any[] = [];

//   for (const item of scored) {
//     if (remainingGuests <= 0) break;

//     const room = item.room;

//     const capacity = room.sumbed || 0;

//     // כמה אפשר להכניס לחדר הזה
//     const assigned = Math.min(capacity, remainingGuests);

//     if (assigned <= 0) continue;

//     allocations.push({
//       roomId: room.id,
//       roomNum: room.roomNum,

//       assignedGuests: assigned,
//       score: item.score
//     });

//     remainingGuests -= assigned;
//   }

//   // ==============================
//   // 5. אם לא הצלחנו לשבץ את כולם
//   // ==============================
//   if (remainingGuests > 0) {
//     return {
//       success: false,
//       type: "partial-allocation",

//       message: `לא נמצא מקום לכל האורחים. נשארו ${remainingGuests} ללא שיבוץ`,

//       allocations,

//       suggestion: {
//         text: "ניתן ליצור הזמנה נוספת עבור האורחים שנותרו",
//         remainingGuests
//       }
//     };
//   }

//   // ==============================
//   // 6. הצלחה מלאה
//   // ==============================
//   return {
//     success: true,
//     type: "allocated",
//     allocations
//   };
// }

import eventMap from "../utils/eventMap";
import { calculateScore } from "../utils/scoreUtil";
import { Registereds } from "./types";

function isRoomFree(room: any, request: any, registeredMap: Map<string, Registereds>): boolean {
    const bookings = room.bookings || [];
    const requestParts = eventMap[request.tripType] || [];

    for (const b of bookings) {
        const reg = registeredMap.get(b.registeredsId);
        if (!reg) continue;

        const occupiedParts = eventMap[reg.event?.event || ""] || [];

        const overlap = requestParts.some(part =>
            occupiedParts.includes(part)
        );

        if (overlap) return false;
    }

    return true;
}

export function processBookingEngine(
    request: any,
    rooms: any[],
    registeredMap: Map<string, Registereds>
) {

    const availableRooms = rooms.filter(room =>
        isRoomFree(room, request, registeredMap)
    );

    const scored = availableRooms.map(room => ({
        room,
        score: calculateScore(room, request)
    }));

    scored.sort((a, b) => b.score - a.score);

    if (!scored.length) {
        return {
            success: false,
            type: "no-match",
            allocations: []
        };
    }

    let remainingGuests = request.guests;
    const allocations: any[] = [];

    for (const item of scored) {
        if (remainingGuests <= 0) break;

        const room = item.room;
        const capacity = room.sumbed || 0;

        const assigned = Math.min(capacity, remainingGuests);

        if (assigned <= 0) continue;

        allocations.push({
            roomId: room.id,
            roomNum: room.roomNum,
            assignedGuests: assigned,
            score: item.score
        });

        remainingGuests -= assigned;
    }

    if (remainingGuests > 0) {
        return {
            success: false,
            type: "partial-allocation",
            allocations,
            remainingGuests,
            message: `נשארו ${remainingGuests} אורחים ללא שיבוץ`
        };
    }

    return {
        success: true,
        type: "allocated",
        allocations
    };
}