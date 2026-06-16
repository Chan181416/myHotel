import { Condition, RoomDB } from "../services/types";

export function calculateScore(
  room: RoomDB & { condition?: Condition },
  request: any
): number {

  let score = 0;

  if (!room) return 0;

  const conditionOption = room.condition?.option;

  // תנאי חדר (GUID → option)
  if (request.seaView && conditionOption === "מול הים") {
    score += 80;
  }

  if (request.doubleRoom && conditionOption === "זוגי") {
    score += 80;
  }

  // התאמת קיבולת
  const diff = Math.abs(room.sumbed - request.guests);

  if (diff === 0) score += 20;
  else if (diff === 1) score += 15;
  else if (diff === 2) score += 10;

  return score;
}