export interface BookingRequest {
  guests: number;
  event: string;
  conditionId?: string;
}

export interface BookingResult {
  success: boolean;
  type: "exact-match" | "alternative" | "no-match";
  room?: any;
  score?: number;
}