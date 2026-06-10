// services/bookingService.ts
import { RoomDB, RoomLocation, Registereds } from "../services/types"; // הגדרות TypeScript של הנתונים
import { SCORE_WEIGHTS, calculateScore } from "../utils/scoreUtil";
import eventMap from "../utils/eventMap";

interface BookingRequest {
  guests: number;
  event: string;
  seaView?: boolean;
  doubleRoom?: boolean;
  preferredFloor?: number | null;
  accessibility?: boolean;
}

interface BookingResult {
  success: boolean;
  type: "exact-match" | "alternative" | "no-match";
  room?: RoomDB;
  score?: number;
  message?: string;
}

export async function processBooking(
  request: BookingRequest,
  rooms: RoomDB[],
  roomLocations: RoomLocation[],
  registereds: Registereds[]
): Promise<BookingResult> {
  // סינון ראשוני לפי קיבולת ומאפיינים בסיסיים
  const filteredRooms = rooms.filter((room) => {
    if (room.sumbed < request.guests) return false;
    if (request.seaView && !room.seaView) return false;
    return true;
  });

  // בדיקה אם החדר פנוי באירוע המבוקש
  const availableRooms = filteredRooms.filter((room) =>
    isRoomAvailable(room, request.event, roomLocations, registereds)
  );

  if (availableRooms.length === 0) {
    return { success: false, type: "no-match", message: "לא נמצאו חדרים פנויים." };
  }

  // חישוב ניקוד לכל חדר פנוי
  const scoredRooms = availableRooms.map((room) => {
    const score = calculateScore(room, request);
    return { room, score };
  });

  // מציאת החדר עם הציון הגבוה ביותר
  const best = scoredRooms.reduce(
    (prev, curr) => (curr.score > prev.score ? curr : prev),
    { room: null as RoomDB | null, score: -1 }
  );

  if (!best.room) {
    return { success: false, type: "no-match", message: "לא נמצאו חדרים מתאימים." };
  }

  // בדיקת סף מינימום
  const MINIMUM_MATCH_SCORE = 80;
  if (best.score >= MINIMUM_MATCH_SCORE) {
    return { success: true, type: "exact-match", room: best.room, score: best.score };
  } else {
    return {
      success: false,
      type: "alternative",
      room: best.room,
      score: best.score,
      message: "לא נמצאה התאמה מלאה, נמצאה חלופה קרובה."
    };
  }
}

// פונקציה שבודקת זמינות חדר לפי RoomLocation והאירועים
function isRoomAvailable(
  room: RoomDB,
  requestEvent: string,
  roomLocations: RoomLocation[],
  registereds: Registereds[]
): boolean {
  const requestedParts = eventMap[requestEvent] || [];

  const assignments = roomLocations.filter((rl) => rl.rooms === room.id);

  for (const assignment of assignments) {
    const registered = registereds.find((r) => r.id === assignment.registeredsId);
    if (!registered) continue;

    const occupiedEvent = registered.event?.event;
    const occupiedParts = eventMap[occupiedEvent || ""] || [];

    // בדיקה אם יש חפיפה בין האירועים
    if (requestedParts.some((part) => occupiedParts.includes(part))) {
      return false;
    }
  }

  return true;
}