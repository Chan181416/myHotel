
import axios from "axios";
import { Request, Response } from "express";
import { processBookingEngine } from "../services/allocationEngine";
import { RoomDB, RoomLocation, Registereds, PricesList, Condition } from "../services/types";

export const loadData = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        const [roomsRes, roomLocationsRes, registeredsRes, eventRes] =
            await Promise.all([
                axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
                axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`),
                axios.get<Registereds[]>(`${process.env.CSHARP_API}/registereds`),
                axios.get<PricesList[]>(`${process.env.CSHARP_API}/PricesList`),
                // axios.get<Condition[]>(`${process.env.CSHARP_API}/Condition`)
            ])


        const rooms = roomsRes.data;
        const roomLocations = roomLocationsRes.data;
        const registereds = registeredsRes.data;
        const events = eventRes.data;



        const registeredMap = new Map<string, Registereds>(
            registereds.map(r => [r.id, r])
        );
        const eventsMap = new Map<string, PricesList>(
            events.map(e => [e.idPrice, e])
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
            registeredMap,
            eventsMap,


        );
        return res.json({ result });

    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        });
    }

};
