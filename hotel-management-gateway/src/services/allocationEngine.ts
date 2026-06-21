// import eventMap from "../utils/eventMap";
// import { calculateScore } from "../utils/scoreUtil";

// export function processBookingEngine(
//   request,
//   rooms,
//   registeredMap
// ) {function isRoomFree(room, requestEvent, registeredMap) {

//   const bookings = room.bookings;

//   for (const b of bookings) {
//     const reg = registeredMap.get(b.registeredsId);
//     if (!reg) continue;

//     const occupiedEvent = reg.event?.event;

//     const overlap =
//       eventMap[requestEvent]?.some(e =>
//         eventMap[occupiedEvent || ""]?.includes(e)
//       );

//     if (overlap) return false;
//   }

//   return true;
// }
// const availableRooms = rooms.filter(room =>
//   room.sumbed >= request.guests &&
//   isRoomFree(room, request.event, registeredMap)
// );

// const scored = availableRooms.map(room => ({
//   room,
//   score: calculateScore(room, request)
// }));

// scored.sort((a, b) => b.score - a.score);

// const best = scored[0];

// if (!best) {
//   return {
//     success: false,
//     type: "no-match"
//   };
// }

// return {
//   success: true,
//   type: "best-match",
//   room: best.room,
//   score: best.score
// };
// }
import eventMap from "../utils/eventMap";
import { calculateScore } from "../utils/scoreUtil";
import { Registereds } from "./types";

export  function processBookingEngine(
  request: any,
  // rooms: any[],
  // registeredMap: Map<string, Registereds>
) {
  function isRoomFree(room: any): boolean {
    const bookings = room.bookings || [];

    for (const b of bookings) {
      // const reg = registeredMap.get(b.registeredsId);
      // if (!reg) continue;

      // const occupiedEvent = reg.event?.event;

      const requestParts = eventMap[request.event] || [];
      // const occupiedParts = eventMap[occupiedEvent || ""] || [];

      // const overlap = requestParts.some(part =>
      //   occupiedParts.includes(part)
      // );

      // if (overlap) return false;
    }

    return true;
  }

  // const availableRooms = rooms.filter(
  //   (room) =>
  //     room.sumbed >= request.guests &&
  //     isRoomFree(room)
  // );

  // const scored = availableRooms.map((room) => ({
  //   room,
  //   score: calculateScore(room, request)
  // }));

  // scored.sort((a, b) => b.score - a.score);

  // if (!scored.length) {
  //   return {
  //     success: false,
  //     type: "no-match"
  //   };
  // }
  // const best = scored[0];

  // if (!best) {
  //   return {
  //     success: false,
  //     type: "no-match"
  //   };
  // }

  // return {
  //   success: true,
  //   type: "best-match",
  //   room: best.room,
  //   score: best.score
  // };
}