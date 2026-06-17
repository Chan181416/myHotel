import axios from "axios";
import { Request, Response } from "express";
import { processBookingEngine } from "../services/allocationEngine";
import { Condition, Registereds, RoomDB, RoomLocation } from "../services/types";

interface FormData {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  date: string;
  tripType: string | null;
  roomType: string | null;
  guests: number;
}

export const loadData = async (req: Request, res: Response) => {
  try {
    const formData: FormData = req.body;

    const [registeredsRes, roomsRes, conditionsRes, roomLocationsRes] =
      await Promise.all([
        axios.get<Registereds[]>(`${process.env.CSHARP_API}/Registereds`),
        axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
        axios.get<Condition[]>(`${process.env.CSHARP_API}/Condition`),
        axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`)
      ]);

    const registereds = registeredsRes.data;
    const rooms = roomsRes.data;
    const conditions = conditionsRes.data;
    const roomLocations = roomLocationsRes.data;

    const conditionMap = new Map<string, Condition>(
      conditions.map(c => [c.id, c])
    );

    const registeredMap = new Map<string, Registereds>(
      registereds.map(r => [r.id, r])
    );

    const roomLocationsByRoom = new Map<string, RoomLocation[]>();
    for (const rl of roomLocations) {
      if (!roomLocationsByRoom.has(rl.rooms)) {
        roomLocationsByRoom.set(rl.rooms, []);
      }
      roomLocationsByRoom.get(rl.rooms)!.push(rl);
    }

    const enrichedRooms = rooms.map(room => ({
      ...room,
      condition: conditionMap.get(room.conditionId),
      bookings: roomLocationsByRoom.get(room.id) || []
    }));

    const result = processBookingEngine(
      formData,
      enrichedRooms,
      registeredMap
    );

    res.json(result);

  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};