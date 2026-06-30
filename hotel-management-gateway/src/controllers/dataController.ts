
// import axios from "axios";
// import { Request, Response } from "express";
// import { processBookingEngine } from "../services/allocationEngine";
// import { RoomDB, RoomLocation, Registereds, PricesList, Condition } from "../services/types";

// export const loadData = async (req: Request, res: Response) => {
//     try {
//         const formData = req.body;

//         const [roomsRes, roomLocationsRes, registeredsRes, eventRes] =
//             await Promise.all([
//                 axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
//                 axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`),
//                 axios.get<Registereds[]>(`${process.env.CSHARP_API}/registereds`),
//                 axios.get<PricesList[]>(`${process.env.CSHARP_API}/PricesList`),
//                 // axios.get<Condition[]>(`${process.env.CSHARP_API}/Condition`)
//             ])


//         const rooms = roomsRes.data;
//         const roomLocations = roomLocationsRes.data;
//         const registereds = registeredsRes.data;
//         const events = eventRes.data;



//         const registeredMap = new Map<string, Registereds>(
//             registereds.map(r => [r.id, r])
//         );
//         const eventsMap = new Map<string, PricesList>(
//             events.map(e => [e.idPrice, e])
//         );

//         const roomLocationsByRoom = new Map<string, RoomLocation[]>();

//         for (const rl of roomLocations) {
//             if (!roomLocationsByRoom.has(rl.rooms)) {
//                 roomLocationsByRoom.set(rl.rooms, []);
//             }
//             roomLocationsByRoom.get(rl.rooms)!.push(rl);
//         }

//         const enrichedRooms = rooms.map(room => ({
//             ...room,
//             bookings: roomLocationsByRoom.get(room.id) || []
//         }));

//         const result = processBookingEngine(
//             formData,
//             enrichedRooms,
//             registeredMap,
//             eventsMap,


//         );
//         return res.json({ result });

//     } catch (error: any) {
//         return res.status(500).json({
//             message: error.message
//         });
//     }

// };


import axios from "axios";
import { Request, Response } from "express";
import { processBookingEngine } from "../services/allocationEngine";

export const loadData = async (req: Request, res: Response) => {
    try {
        const formData = req.body;

        console.log("loadData received:", formData);

        // ─── שליפת כל הנתונים מה-C# API ───
        const [roomsRes, roomLocationsRes, registeredsRes, eventsRes, conditionsRes] =
            await Promise.all([
                axios.get(`${process.env.CSHARP_API}/RoomDB`),
                axios.get(`${process.env.CSHARP_API}/api/roomLocation`),
                axios.get(`${process.env.CSHARP_API}/registereds`),
                axios.get(`${process.env.CSHARP_API}/PricesList`),
                axios.get(`${process.env.CSHARP_API}/Condition`) // ✅ שליפת כל התנאים
            ]);

        const rooms = roomsRes.data;
        const roomLocations = roomLocationsRes.data;
        const registereds = registeredsRes.data;
        const events = eventsRes.data;
        const conditions = conditionsRes.data;

        // ─── מיפוי registered לפי ID ───
        const registeredMap = new Map<string, any>(
            registereds.map((r: any) => [r.id, r])
        );

        // ─── מיפוי PriceList לפי ID ───
        const eventsMap = new Map<string, any>(
            events.map((e: any) => [e.idPrice, e])
        );

        // ─── מיפוי Condition לפי ID ───
        const conditionsMap = new Map<string, any>(
            conditions.map((c: any) => [c.id, c])
        );

        // ─── מיפוי RoomLocations לפי room ID ───
        const roomLocationsByRoom = new Map<string, any[]>();
        for (const rl of roomLocations) {
            const roomId = rl.rooms;
            if (!roomLocationsByRoom.has(roomId)) {
                roomLocationsByRoom.set(roomId, []);
            }
            roomLocationsByRoom.get(roomId)!.push(rl);
        }

        // ─── העשרת החדרים עם RoomLocations ───
        const enrichedRooms = rooms.map((room: any) => ({
            ...room,
            roomLocations: roomLocationsByRoom.get(room.id) || []
        }));

        console.log(`נטענו ${rooms.length} חדרים, ${registereds.length} רשומים, ${events.length} אירועים, ${conditions.length} תנאים`);

        // ─── קריאה למנוע השיבוץ ───
        const result = await processBookingEngine(
            formData,
            enrichedRooms,
            registeredMap,
            eventsMap,
            conditionsMap // ✅ העברת מפת התנאים
        );

        console.log("תוצאת השיבוץ:", result.type);

        return res.json({ result });

    } catch (error: any) {
        console.error("❌ loadData error:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};