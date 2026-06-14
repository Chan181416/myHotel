// import axios from "axios";
// import { processBooking } from "../services/bookingService";

// export const loadData = async (req, res) => {
//   try {
//     const formData = req.body;

//     // 🔹 שמירת הערכים המקוריים
//     const originalTripType = formData.tripType;
//     const originalRoomType = formData.roomType;

//     // 🔹 שליפת tripTypeId (event) בצורה בטוחה
//     let tripTypeId = null;
//     try {
//       const eventResponse = await axios.get(
//         `http://localhost:5044/PricesList/idbyevent/${encodeURIComponent(originalTripType)}`
//       );
//       tripTypeId = eventResponse.data;
//     } catch (err) {
//       console.warn(`Event '${originalTripType}' לא נמצא. המשך עם null.`);
//     }
//     formData.tripType = tripTypeId;

//     // 🔹 שליפת conditionId בצורה בטוחה
//     let conditionId = null;
//     try {
//       const conditionResponse = await axios.get(
//         `http://localhost:5044/Condition/idbyoption/${encodeURIComponent(originalRoomType)}`
//       );
//       conditionId = conditionResponse.data;
//     } catch (err) {
//       console.warn(`Condition '${originalRoomType}' לא נמצא. המשך עם null.`);
//     }
//     formData.roomType = conditionId;

//     console.log("After IDs replacement:", formData);

//     // 🔹 שליפת נתונים מהשרת
//     const [registeredsResponse, roomsResponse, roomLocationsResponse] = await Promise.all([
//       axios.get("http://localhost:5044/Registereds"),
//       axios.get("http://localhost:5044/RoomDB"),
//       axios.get("http://localhost:5044/RoomLocation")
//     ]);

//     const registereds = registeredsResponse.data;
//     const rooms = roomsResponse.data;
//     const roomLocations = roomLocationsResponse.data;

//     // 🔹 קריאה ל-processBooking עם כל הנתונים
//     const bookingResult = await processBooking(
//       {
//         guests: formData.guests,
//         event: originalTripType,
//         seaView: originalRoomType === "מול הים",
//         doubleRoom: originalRoomType === "אקסטרה", // אקסטרה = חדר זוגי
//         preferredFloor: null,
//         accessibility: false
//       },
//       rooms,
//       roomLocations,
//       registereds
//     );

//     // 🔹 החזרת כל הנתונים ב-res.json פעם אחת
//     res.json({
//       clientData: formData,
//       rooms,
//       registereds,
//       roomLocations,
//       bookingResult
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };



import axios from "axios";
import { Request, Response } from "express";
import { processBooking } from "../services/bookingService";
import {Registereds,RoomDB,RoomLocation} from "../services/types"
// טיפוס עבור הנתונים שמגיעים מהלקוח
interface FormData {
  id?: string;
  name?: string;
  phone?: string;
  email?: string;
  date: string;
  tripType: string | null;   // יכול להיות null אם לא נמצא
  roomType: string | null;   // יכול להיות null אם לא נמצא
  guests: number;
}


export const loadData = async (req: Request, res: Response) => {
  try {
    const formData: FormData = req.body;
console.log(formData);

    // 🔹 שמירת הערכים המקוריים
    const originalTripType = formData.tripType;
    const originalRoomType = formData.roomType;

    // 🔹 שליפת tripTypeId (event) בצורה בטוחה
    let tripTypeId: string | null = null;
    try {
      const eventResponse = await axios.get<string>(
        `${process.env.CSHARP_API}/PricesList/idbyevent/${encodeURIComponent(originalTripType || "")}`
      );
      tripTypeId = eventResponse.data;
    } catch (err) {
      console.warn(`Event '${originalTripType}' לא נמצא. המשך עם null.`);
    }
    formData.tripType = tripTypeId;

    // 🔹 שליפת conditionId בצורה בטוחה
    let conditionId: string | null = null;
    try {
      const conditionResponse = await axios.get<string>(
        `${process.env.CSHARP_API}/Condition/idbyoption/${encodeURIComponent(originalRoomType || "")}`
      );
      conditionId = conditionResponse.data;
    } catch (err) {
      console.warn(`Condition '${originalRoomType}' לא נמצא. המשך עם null.`);
    }
    formData.roomType = conditionId;

    console.log("After IDs replacement:", formData);

    // 🔹 שליפת נתונים מהשרת
    const [registeredsResponse, roomsResponse, roomLocationsResponse] = await Promise.all([
      axios.get<Registereds[]>(`${process.env.CSHARP_API}/Registereds`),
      axios.get<RoomDB[]>(`${process.env.CSHARP_API}/RoomDB`),
      axios.get<RoomLocation[]>(`${process.env.CSHARP_API}/api/roomLocation`)
    ]);

    const registereds = registeredsResponse.data;
    const rooms = roomsResponse.data;
    const roomLocations = roomLocationsResponse.data;

    // 🔹 קריאה ל-processBooking עם כל הנתונים
    const bookingResult = await processBooking(
      {
        guests: formData.guests,
        event: originalTripType || "",
        seaView: originalRoomType === "מול הים",
        doubleRoom: originalRoomType === "אקסטרה", // אקסטרה = חדר זוגי
        preferredFloor: null,
        accessibility: false
      },
      rooms,
      roomLocations,
      registereds
    );

    // 🔹 החזרת כל הנתונים ב-res.json פעם אחת
    res.json({
      clientData: formData,
      rooms,
      registereds,
      roomLocations,
      bookingResult
    });

  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export {};