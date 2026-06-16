
// import axios from "axios";
// import { Request, Response } from "express";
// import { processBooking } from "../services/bookingService";
// import { Condition, Registereds, RoomDB, RoomLocation } from "../services/types"
// import { processBookingEngine } from "../services/allocationEngine";
// // טיפוס עבור הנתונים שמגיעים מהלקוח
// interface FormData {
//   id?: string;
//   name?: string;
//   phone?: string;
//   email?: string;
//   date: string;
//   tripType: string | null;   // יכול להיות null אם לא נמצא
//   roomType: string | null;   // יכול להיות null אם לא נמצא
//   guests: number;
// }
// export const loadData = async (req: Request, res: Response) => {
//   try {
//     const formData: FormData = req.body;
//     console.log(formData);

//     // 🔹 שמירת הערכים המקוריים
//     const originalTripType = formData.tripType;
//     const originalRoomType = formData.roomType;

//     // 🔹 שליפת tripTypeId (event) בצורה בטוחה
//     let tripTypeId: string | null = null;
//     try {
//       const eventResponse = await axios.get<string>(
//         `${process.env.CSHARP_API}/PricesList/idbyevent/${encodeURIComponent(originalTripType || "")}`
//       );
//       tripTypeId = eventResponse.data;
//     } catch (err) {
//       console.warn(`Event '${originalTripType}' לא נמצא. המשך עם null.`);
//     }
//     formData.tripType = tripTypeId;

//     // 🔹 שליפת conditionId בצורה בטוחה
//     let conditionId: string | null = null;
//     try {
//       const conditionResponse = await axios.get<string>(
//         `${process.env.CSHARP_API}/Condition/idbyoption/${encodeURIComponent(originalRoomType || "")}`
//       );
//       conditionId = conditionResponse.data;
//     } catch (err) {
//       console.warn(`Condition '${originalRoomType}' לא נמצא. המשך עם null.`);
//     }
//     formData.roomType = conditionId;

//     console.log("After IDs replacement:", formData);

//     // 🔹 שליפת נתונים מהשרת
//     const [registeredsResponse, roomsResponse, conditionsResponse, roomLocationsResponse] = await Promise.all([
//       axios.get<Registereds[]>(`${process.env.CSHARP_API}/Registereds`),
//       axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
//       axios.get<Condition[]>(`${process.env.CSHARP_API}/Condition`),
//       axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`)
//     ]);

//     const registereds = registeredsResponse.data;
//     const rooms = roomsResponse.data;
//     const roomLocations = roomLocationsResponse.data;
//     const conditions = conditionsResponse.data; // חובה להוסיף

//     const conditionMap = new Map(
//       conditions.map(c => [c.id, c])
//     );

//     const roomLocationsByRoom = new Map<string, RoomLocation[]>();

//     for (const rl of roomLocations) {
//       if (!roomLocationsByRoom.has(rl.rooms)) {
//         roomLocationsByRoom.set(rl.rooms, []);
//       }
//       roomLocationsByRoom.get(rl.rooms)!.push(rl);
//     }

//     const registeredMap = new Map(
//       registereds.map(r => [r.id, r])
//     );
//     const enrichedRooms = rooms.map(room => ({
//       ...room,
//       condition: conditionMap.get(room.conditionId),
//       bookings: roomLocationsByRoom.get(room.id) || []
//     }));

//     const result = processBookingEngine(
//       formData,
//       enrichedRooms,
//       registeredMap
//     );

//         // 🔹 קריאה ל-processBooking עם כל הנתונים
//         const bookingResult = await processBooking(
//           {
//             guests: formData.guests,
//             event: originalTripType || "",
//             seaView: originalRoomType === "מול הים",
//             doubleRoom: originalRoomType === "אקסטרה", // אקסטרה = חדר זוגי
//             preferredFloor: null,
//             accessibility: false
//           },
//           rooms,
//           roomLocations,
//           registereds,
//           conditions
//         );

//         // 🔹 החזרת כל הנתונים ב-res.json פעם אחת
//         res.json({
//           clientData: formData,
//           rooms,
//           registereds,
//           roomLocations,
//           bookingResult
//         });

//       } catch (error: any) {
//         console.error(error);
//         res.status(500).json({ message: error.message });
//       }
//     };
// export default processBookingEngine
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

    const conditionMap = new Map(
      conditions.map(c => [c.id, c])
    );

    const registeredMap = new Map(
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