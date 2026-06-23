// import axios from "axios";
// import { Request, Response } from "express";
// import { processBookingEngine } from "../services/allocationEngine";
// import { Condition, Registereds, RoomDB, RoomLocation } from "../services/types";

// interface FormData {
//   id?: string;
//   name?: string;
//   phone?: string;
//   email?: string;
//   date: string;
//   tripType: string | null;
//   roomType: string | null;
//   guests: number;
// }

// export const loadData = async (req: Request, res: Response) => {
//   try {
//     const formData: FormData = req.body;

//     const [roomsRes, eventRes, roomLocationsRes, registeredsRes] =
//       await Promise.all([
//         axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
//         axios.get<Event[]>(`${process.env.CSHARP_API}/Event`),
//         axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`),
//         axios.get<Registereds[]>(`${process.env.CSHARP_API}/registereds`),

//       ]);

//     const roomLocations = roomLocationsRes.data;
//     const registereds = registeredsRes.data;
//     const rooms = roomsRes.data;
//     const event = eventRes.data;

//     const registeredMap = new Map<string, Registereds>(
//       registereds.map(r => [r.id, r])
//     );

//     const roomLocationsByRoom = new Map<string, RoomLocation[]>();

//     for (const rl of roomLocations) {
//       if (!roomLocationsByRoom.has(rl.rooms)) {
//         roomLocationsByRoom.set(rl.rooms, []);
//       }

//       roomLocationsByRoom.get(rl.rooms)!.push(rl);
//     }

//     const enrichedRooms = rooms.map(room => ({
//       ...room,
//       bookings: roomLocationsByRoom.get(room.id) || [],
//       roomlocation: (roomLocationsByRoom.get(room.id) || []).map(x => x.id)
//     }));

//     const result = processBookingEngine(
//       formData,
//       enrichedRooms,
//       registeredMap
//     );
//     return res.status(200).json({
//       result
//     });
//   }
//   catch (error: any) {
//     console.error(error);
//   }
// }

import axios from "axios";
import { Request, Response } from "express";
import { processBookingEngine } from "../services/allocationEngine";
import { RoomDB, RoomLocation, Registereds } from "../services/types";

export const loadData = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        const [roomsRes, roomLocationsRes, registeredsRes] =
            await Promise.all([
                axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
                axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`),
                axios.get<Registereds[]>(`${process.env.CSHARP_API}/registereds`)
            ]);

        const rooms = roomsRes.data;
        const roomLocations = roomLocationsRes.data;
        const registereds = registeredsRes.data;

        const registeredMap = new Map<string,Registereds>(
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
            bookings: roomLocationsByRoom.get(room.id) || []
        }));

        const result = processBookingEngine(
            formData,
            enrichedRooms,
            registeredMap
        );

        return res.json({ result });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }
};