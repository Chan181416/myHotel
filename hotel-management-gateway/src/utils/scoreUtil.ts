


export function calculateScore(room: any, request: any): number {
  let score = 0;

  if (!room) return 0;

  // ─── התאמת תכולה (סוג חדר) ───
  // request.roomType מגיע כ-"אקסטרה" (string)
  // room.conditionOption מגיע מה-API של Condition.option
  if (request.roomType && room.conditionOption) {
    if (room.conditionOption === request.roomType) {
      score += 100; // התאמה מלאה
    }  // } else {
    //     score -= 50;
    // }
  }

  // ─── התאמת קיבולת ───
  const diff = Math.abs(room.sumbed - Number(request.guests));

  if (diff === 0) {
    score += 50;
  } else if (diff <= 2) {
    score += 30;
  } else if (diff <= 3) {
    score += 20;
  }
  else if (diff <= 4) {
    score += 10;
  }
 

  return score;
}