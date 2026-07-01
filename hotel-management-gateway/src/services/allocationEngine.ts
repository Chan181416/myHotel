// // import eventMap from "../utils/eventMap";
// // import { calculateScore } from "../utils/scoreUtil";
// // import { Registereds, PricesList, Condition } from "./types";
// // import axios from "axios";

// // function isRoomFree(
// //     room: any,
// //     request: any,
// //     registeredMap: Map<string, Registereds>,
// //     eventsMap: Map<string, PricesList>
// // ): boolean {

// //     const bookings = room.bookings || [];

// //     const requestParts =
// //         eventMap[request.tripType] || [];

// //     for (const b of bookings) {

// //         const reg =
// //             registeredMap.get(b.registeredsId);

// //         if (!reg) continue;

// //         // GUID של האירוע מההרשמה
// //         const eventId = reg.priceListId;

// //         // שליפת האירוע מטבלת PricesList
// //         const eventEntity =
// //             eventsMap.get(eventId);

// //         if (!eventEntity) continue;

// //         // שם האירוע
// //         const occupiedEventName =
// //             eventEntity.event || "";

// //         // המרה לימים לצורך בדיקת חפיפה
// //         const occupiedParts =
// //             eventMap[occupiedEventName] || [];

// //         const overlap =
// //             requestParts.some(part =>
// //                 occupiedParts.includes(part)
// //             );

// //         if (overlap) {
// //             return false;
// //         }
// //     }

// //     return true;
// // }

// // export function  processBookingEngine(
// //     request: any,
// //     rooms: any[],
// //     registeredMap: Map<string, Registereds>,
// //     eventsMap: Map<string, PricesList>,
// // ) {

// //     const availableRooms = rooms.filter(room =>
// //         isRoomFree(
// //             room,
// //             request,
// //             registeredMap,
// //             eventsMap
// //         )
// //     );

// //     const scored = availableRooms.map(room => ({
// //         room,
// //         score: calculateScore(room, request)
// //     }));

// //     scored.sort((a, b) => b.score - a.score);

// //     if (scored.length === 0) {
// //         return {
// //             success: false,
// //             type: "no-match",
// //             allocations: []
// //         };
// //     }

// //     let remainingGuests = request.guests;

// //     const allocations: any[] = [];

// //     for (const item of scored) {

// //         if (remainingGuests <= 0) {
// //             break;
// //         }

// //         const room = item.room;

// //         const capacity = room.sumbed || 0;

// //         const assigned =
// //             Math.min(capacity, remainingGuests);

// //         if (assigned <= 0) {
// //             continue;
// //         }

// // //    


// //         allocations.push({
// //             roomId: room.id,
// //             roomNum: room.roomNum,
// //             assignedGuests: assigned,
// //             score: item.score,
// //             condition: room.conditionId
// //         });

// //         remainingGuests -= assigned;
// //     }

// //     if (remainingGuests > 0) {
// //         return {
// //             success: false,
// //             type: "partial-allocation",
// //             allocations,
// //             remainingGuests,
// //             message: `נשארו ${remainingGuests} אורחים ללא שיבוץ`
// //         };
// //     }

// //     return {
// //         success: true,
// //         type: "allocated",
// //         allocations
// //     };
// // }
// import axios from "axios"
// import eventMap from "../utils/eventMap";
// import { calculateScore } from "../utils/scoreUtil";

// // ─── פונקציית בדיקת זמינות ───
// async function isRoomFree(
//     room: any,
//     request: any,
//     registeredMap: Map<string, any>,
//     eventsMap: Map<string, any>
// ): Promise<boolean> {


//     console.log({ "roomid": room.id });

//     const locations = await axios.get(`${process.env.CSHARP_API}/RoomDB/full/${room.id}`)
//     console.log({ "roomLocations": locations.data });

//     const roomLocations = locations.data;
//     // const roomLocations: any[] = [];
//     // for (const r of rLocations) {
//     //     roomLocations.push(r.id)
//     // }
//     // : any[]
//     // const roomLocations: any[] = room.roomLocations ?? [];
//     const locationCount = roomLocations.length;
//     console.log({ "locationCount": locationCount });

//     // חילוץ החלקים של האירוע המבוקש
//     const reqParts = eventMap[request.tripType] || [];

//     // ── מקרה א: 0 → פנוי לגמרי ──
//     if (locationCount === 0) {
//         return true;
//     }

//     // ── מקרה ב: 2 או 3 → תפוס לחלוטין ──
//     if (locationCount >= 2) {
//         return false;
//     }

//     // ── מקרה ג: 1 → בדיקת חפיפה ──
//     const bookingEntry = roomLocations[0];
//     console.log({ "bookingEntry": bookingEntry });
//     const regId = bookingEntry.registeredsId;
//     console.log({ "regId": regId });

//     const reg = registeredMap.get(regId);
//     console.log({ "reg": reg });
//     if (!reg) return true;

//     const eventId = reg.event;
//     console.log({ "eventId": eventId });

//     const eventEntity = eventsMap.get(eventId);
//     console.log({ "event": eventEntity });

//     if (!eventEntity) return true;

//     const occupiedEventName = eventEntity.event || "";
//     const occupiedParts = eventMap[occupiedEventName] || [];

//     // בדיקת חפיפה
//     const overlap = reqParts.some((part: string) => occupiedParts.includes(part));
//     console.log({ "overlop": overlap });

//     return !overlap;
// }

// // ─── פונקציית השיבוץ הראשית ───
// export async function processBookingEngine(
//     request: any,
//     rooms: any[],
//     registeredMap: Map<string, any>,
//     eventsMap: Map<string, any>,
//     conditionsMap: Map<string, any> // ✅ התנאים מועברים מבחוץ
// ) {
//     console.log("processBookingEngine started with request:", request);

//     // שלב 1: סינון חדרים עם קיבולת
//     const roomsWithCapacity = rooms.filter(r => (r.sumbed ?? 0) > 0);

//     if (roomsWithCapacity.length === 0) {
//         return {
//             success: false,
//             type: "no-match",
//             message: "אין חדרים זמינים במערכת",
//             allocations: []
//         };
//     }

//     // שלב 2: בדיקת זמינות לכל החדרים
//     const availabilityResults = await Promise.all(
//         roomsWithCapacity.map(async (room) => {
//             const free = await isRoomFree(room, request, registeredMap, eventsMap);
//             return { room, free };
//         })
//     );

//     const availableRooms = availabilityResults
//         .filter(r => r.free)
//         .map(r => r.room);

//     console.log(`נמצאו ${availableRooms.length} חדרים פנויים מתוך ${roomsWithCapacity.length}`);

//     if (availableRooms.length === 0) {
//         return {
//             success: false,
//             type: "no-match",
//             message: "כל החדרים תפוסים לתאריכים המבוקשים",
//             allocations: []
//         };
//     }

//     // שלב 3: הוספת conditionOption לכל חדר פנוי מתוך ה-conditionsMap
//     // ✅ במקום לקרוא API בכל פעם, פשוט מסתכלים במפה
//     const roomsWithCondition = availableRooms.map(room => {
//         let conditionOption: string | null = null;
//         if (room.conditionId) {
//             const condition = conditionsMap.get(room.conditionId);
//             conditionOption = condition?.option ?? null;
//         }
//         return { ...room, conditionOption };
//     });

//     // שלב 4: דירוג ומיון לפי ציון
//     const scored = roomsWithCondition.map(room => ({
//         room,
//         score: calculateScore(room, request)
//     }));

//     scored.sort((a, b) => b.score - a.score);

//     console.log("דירוג החדרים:", scored.map(s => ({
//         roomNum: s.room.roomNum,
//         score: s.score,
//         condition: s.room.conditionOption,
//         sumbed: s.room.sumbed
//     })));

//     // שלב 5: שיבוץ בלולאה - עד שכל האורחים שובצו
//     let remainingGuests = Number(request.guests);
//     const allocations: any[] = [];

//     for (const item of scored) {
//         if (remainingGuests <= 0) break;

//         const room = item.room;
//         const capacity = room.sumbed || 0;
//         const assigned = Math.min(capacity, remainingGuests);

//         if (assigned <= 0) continue;

//         allocations.push({
//             roomId: room.id,
//             roomNum: room.roomNum,
//             floor: room.floor,
//             assignedGuests: assigned,
//             score: item.score,
//             conditionId: room.conditionId,
//             conditionOption: room.conditionOption
//         });

//         remainingGuests -= assigned;

//         console.log(`שובץ חדר ${room.roomNum} (קיבולת ${capacity}) → ${assigned} אורחים. נשארו ${remainingGuests}`);
//     }

//     // שלב 6: תוצאה
//     if (remainingGuests > 0) {
//         return {
//             success: false,
//             type: "partial-allocation",
//             allocations,
//             remainingGuests,
//             message: `נשארו ${remainingGuests} אורחים ללא שיבוץ. שובצו ${allocations.length} חדרים.`
//         };
//     }

//     return {
//         success: true,
//         type: "allocated",
//         allocations,
//         message: `ההזמנה שובצה בהצלחה ב-${allocations.length} חדרים`
//     };
// }


import eventMap from "../utils/eventMap";

// ─── פונקציית בדיקת זמינות ───
async function isRoomFree(
    room: any,
    request: any,
    registeredMap: Map<string, any>,
    eventsMap: Map<string, any>
): Promise<boolean> {
    const roomLocations: any[] = room.roomLocations ?? [];
    const locationCount = roomLocations.length;

    const reqParts = eventMap[request.tripType] || [];

    if (locationCount === 0) return true;

    if (locationCount >= 2) return false;

    // ── מקרה: 1 ──
    const bookingEntry = roomLocations[0];
    const regId = bookingEntry.registeredsId;
    const reg = registeredMap.get(regId);

    if (!reg) return true;

    const eventId = reg.event;
    const eventEntity = eventsMap.get(eventId);

    if (!eventEntity) return true;

    const occupiedEventName = eventEntity.event || "";
    const occupiedParts = eventMap[occupiedEventName] || [];

    const overlap = reqParts.some((part: string) => occupiedParts.includes(part));

    return !overlap;
}

// ─── פונקציה למציאת החדר המתאים ביותר לפי מספר האנשים שנשארו ───
function findBestRoomForGuests(
    rooms: any[],
    numGuests: number,
    request: any,
    conditionsMap: Map<string, any>
): { room: any; score: number } | null {
    let bestRoom: any = null;
    let bestScore = -Infinity;

    for (const room of rooms) {
        const capacity = room.sumbed || 0;
        if (capacity <= 0) continue;

        const diff = Math.abs(capacity - numGuests);

        // ציון לפי קרבה למספר האנשים שנשארו
        let score = 100 - (diff * 10);
        if (diff === 0) score = 100;
        else if (diff === 1) score = 90;
        else if (diff === 2) score = 80;
        else if (diff === 3) score = 70;
        else if (diff === 4) score = 60;
        else score = Math.max(0, 50 - (diff * 5));

        // בונוס להתאמת סוג חדר
        let conditionOption: string | null = null;
        if (room.conditionId) {
            const condition = conditionsMap.get(room.conditionId);
            conditionOption = condition?.option ?? null;
        }

        if (request.roomType && conditionOption) {
            if (conditionOption === request.roomType) {
                score += 50;
            }
        }

        if (score > bestScore) {
            bestScore = score;
            bestRoom = { ...room, conditionOption };
        }
    }

    if (!bestRoom) return null;
    return { room: bestRoom, score: bestScore };
}

// ─── פונקציית השיבוץ הראשית ───
export async function processBookingEngine(
    request: any,
    rooms: any[],
    registeredMap: Map<string, any>,
    eventsMap: Map<string, any>,
    conditionsMap: Map<string, any>
) {
    console.log("processBookingEngine started with request:", request);

    const totalGuests = Number(request.guests);

    // שלב 1: סינון חדרים עם קיבולת
    const roomsWithCapacity = rooms.filter(r => (r.sumbed ?? 0) > 0);

    if (roomsWithCapacity.length === 0) {
        return {
            success: false,
            type: "no-match",
            message: "אין חדרים זמינים במערכת",
            allocations: []
        };
    }

    // שלב 2: בדיקת זמינות
    const availabilityResults = await Promise.all(
        roomsWithCapacity.map(async (room) => {
            const free = await isRoomFree(room, request, registeredMap, eventsMap);
            return { room, free };
        })
    );

    let availableRooms = availabilityResults
        .filter(r => r.free)
        .map(r => r.room);

    console.log(`נמצאו ${availableRooms.length} חדרים פנויים מתוך ${roomsWithCapacity.length}`);

    if (availableRooms.length === 0) {
        return {
            success: false,
            type: "no-match",
            message: "כל החדרים תפוסים לתאריכים המבוקשים",
            allocations: []
        };
    }

    // שלב 3: הפרדה — קודם תפוסים חלקית, אחר כך ריקים
    const partiallyOccupiedRooms = availableRooms.filter(
        r => (r.roomLocations?.length ?? 0) === 1
    );
    const emptyRooms = availableRooms.filter(
        r => (r.roomLocations?.length ?? 0) === 0
    );

    console.log(`חדרים תפוסים חלקית: ${partiallyOccupiedRooms.length}, חדרים ריקים: ${emptyRooms.length}`);

    // שלב 4: שיבוץ
    let remainingGuests = totalGuests;
    const allocations: any[] = [];

    // שלב 4א: קודם תפוסים חלקית
    if (remainingGuests > 0 && partiallyOccupiedRooms.length > 0) {
        console.log("\n--- שיבוץ בחדרים תפוסים חלקית ---");

        while (remainingGuests > 0) {
            const best = findBestRoomForGuests(
                partiallyOccupiedRooms.filter(r => !allocations.find(a => a.roomId === r.id)),
                remainingGuests,
                request,
                conditionsMap
            );

            if (!best) break;

            const room = best.room;
            const capacity = room.sumbed || 0;
            const assigned = Math.min(capacity, remainingGuests);

            allocations.push({
                roomId: room.id,
                roomNum: room.roomNum,
                floor: room.floor,
                assignedGuests: assigned,
                score: best.score,
                conditionId: room.conditionId,
                conditionOption: room.conditionOption,
                isPartiallyOccupied: true
            });

            remainingGuests -= assigned;
            console.log(`שובץ חדר תפוס חלקית ${room.roomNum} (קיבולת ${capacity}) → ${assigned} אורחים. נשארו ${remainingGuests}`);
        }
    }

    // שלב 4ב: אחר כך ריקים
    if (remainingGuests > 0 && emptyRooms.length > 0) {
        console.log("\n--- שיבוץ בחדרים ריקים ---");

        while (remainingGuests > 0) {
            const best = findBestRoomForGuests(
                emptyRooms.filter(r => !allocations.find(a => a.roomId === r.id)),
                remainingGuests,
                request,
                conditionsMap
            );

            if (!best) break;

            const room = best.room;
            const capacity = room.sumbed || 0;
            const assigned = Math.min(capacity, remainingGuests);

            allocations.push({
                roomId: room.id,
                roomNum: room.roomNum,
                floor: room.floor,
                assignedGuests: assigned,
                score: best.score,
                conditionId: room.conditionId,
                conditionOption: room.conditionOption,
                isPartiallyOccupied: false
            });

            remainingGuests -= assigned;
            console.log(`שובץ חדר ריק ${room.roomNum} (קיבולת ${capacity}) → ${assigned} אורחים. נשארו ${remainingGuests}`);
        }
    }

    // שלב 5: תוצאה
    if (remainingGuests > 0) {
        return {
            success: false,
            type: "partial-allocation",
            allocations,
            remainingGuests,
            message: `נשארו ${remainingGuests} אורחים ללא שיבוץ. שובצו ${allocations.length} חדרים.`
        };
    }

    return {
        success: true,
        type: "allocated",
        allocations,
        message: `ההזמנה שובצה בהצלחה ב-${allocations.length} חדרים`
    };
}