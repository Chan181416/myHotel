import { Condition, RoomDB } from "../services/types";

export function calculateScore(room: any, request: any): number {
  console.log({"request": request });

  let score = 0;

  if (!room) return 0;

  const conditionOption = room.condition?.option;

  // תנאי חדר (GUID → option)
  if (request.roomType && conditionOption === "מול_הים") {
    score += 80;
  }

  if (request.roomType && conditionOption === "אקסטרה") {
    score += 80;
  }

  // התאמת קיבולת
  const diff = Math.abs(room.sumbed - request.guests);

  if (diff === 0) score += 20;
  else if (diff === 1) score += 15;
  else if (diff === 2) score += 10;

  return score;
}