import eventMap from "../utils/eventMap";
import { calculateScore } from "../utils/scoreUtil";
import { Registereds, PricesList, Condition } from "./types";
import axios from "axios";

function isRoomFree(
    room: any,
    request: any,
    registeredMap: Map<string, Registereds>,
    eventsMap: Map<string, PricesList>
): boolean {

    const bookings = room.bookings || [];

    const requestParts =
        eventMap[request.tripType] || [];

    for (const b of bookings) {

        const reg =
            registeredMap.get(b.registeredsId);

        if (!reg) continue;

        // GUID של האירוע מההרשמה
        const eventId = reg.priceListId;

        // שליפת האירוע מטבלת PricesList
        const eventEntity =
            eventsMap.get(eventId);

        if (!eventEntity) continue;

        // שם האירוע
        const occupiedEventName =
            eventEntity.event || "";

        // המרה לימים לצורך בדיקת חפיפה
        const occupiedParts =
            eventMap[occupiedEventName] || [];

        const overlap =
            requestParts.some(part =>
                occupiedParts.includes(part)
            );

        if (overlap) {
            return false;
        }
    }

    return true;
}

export function  processBookingEngine(
    request: any,
    rooms: any[],
    registeredMap: Map<string, Registereds>,
    eventsMap: Map<string, PricesList>,
) {

    const availableRooms = rooms.filter(room =>
        isRoomFree(
            room,
            request,
            registeredMap,
            eventsMap
        )
    );

    const scored = availableRooms.map(room => ({
        room,
        score: calculateScore(room, request)
    }));

    scored.sort((a, b) => b.score - a.score);

    if (scored.length === 0) {
        return {
            success: false,
            type: "no-match",
            allocations: []
        };
    }

    let remainingGuests = request.guests;

    const allocations: any[] = [];

    for (const item of scored) {

        if (remainingGuests <= 0) {
            break;
        }

        const room = item.room;

        const capacity = room.sumbed || 0;

        const assigned =
            Math.min(capacity, remainingGuests);

        if (assigned <= 0) {
            continue;
        }

//    


        allocations.push({
            roomId: room.id,
            roomNum: room.roomNum,
            assignedGuests: assigned,
            score: item.score,
            condition: room.conditionId
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