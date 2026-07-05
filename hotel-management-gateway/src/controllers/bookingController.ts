

import axios from "axios";
import { Request, Response } from "express";

export const confirmBooking = async (req: Request, res: Response) => {
    console.log("confirmBooking called with body:", req.body);

    try {
        const { formData, allocations } = req.body;

        if (!allocations || allocations.length === 0) {
            return res.status(400).json({
                success: false,
                message: "אין הקצאות לבצע"
            });
        }

        // ─── שלב 1: שליפת GUID של האירוע והתנאי ───
        const [eventGuidRes, conditionGuidRes] = await Promise.all([
            axios.get(`${process.env.CSHARP_API}/PricesList/idbyevent/${formData.tripType}`),
            axios.get(`${process.env.CSHARP_API}/Condition/idbyoption/${formData.roomType}`)
        ]);

        const eventGuid = eventGuidRes.data;
        const conditionGuid = conditionGuidRes.data;

        console.log("Event GUID:", eventGuid);
        console.log("Condition GUID:", conditionGuid);

        // ─── שלב 2: חישוב מחיר ───
        const [price1Res, conditionRes] = await Promise.all([
            axios.get(`${process.env.CSHARP_API}/PricesList/price/${eventGuid}`),
            axios.get(`${process.env.CSHARP_API}/Condition/${conditionGuid}`)
        ]);

        const basePrice = Number(price1Res.data) + Number(conditionRes.data?.price ?? 0);
        const totalPrice = basePrice * Number(formData.guests);

        console.log(`מחיר בסיס: ${basePrice}, סה"כ: ${totalPrice}`);

        // ─── שלב 3: יצירת registered ───
        const regRes = await axios.post(
            `${process.env.CSHARP_API}/registereds`,
            {
                numberId: formData.id,
                name: formData.name,
                sumPlace: Number(formData.guests),
                totalPrice: totalPrice,
                event: eventGuid,
                condition: conditionGuid
            }
        );
        const registeredId = regRes.data.id;
        console.log("✅ נוצר registered עם ID:", registeredId);

        // ─── שלב 4: לולאת שיבוץ עם Rollback ───
        const createdRoomLocationIds: string[] = [];
        const createdRoomLocations: any[] = [];

        try {
            for (const alloc of allocations) {
                console.log(`\nמעבד חדר ${alloc.roomNum} (${alloc.roomId})`);

                // 4א: יצירת RoomLocation חדש
                const roomLocRes = await axios.post(
                    `${process.env.CSHARP_API}/api/roomLocation`,
                    {
                        rooms: alloc.roomId,
                        registeredsId: registeredId
                    }
                );

                const roomLocationId = roomLocRes.data.id;
                createdRoomLocationIds.push(roomLocationId);
                console.log(`  ✅ נוצר RoomLocation ID: ${roomLocationId}`);

             

                createdRoomLocations.push({
                    roomId: alloc.roomId,
                    roomNum: alloc.roomNum,
                    roomLocationId
                });
            }
        } catch (loopError) {
            // ─── Rollback: מחיקת כל ה-RoomLocations שיצרנו ───
            console.error("❌ שגיאה במהלך השיבוץ, מתחיל Rollback...");

            for (const id of createdRoomLocationIds) {
                try {
                    await axios.delete(`${process.env.CSHARP_API}/api/roomLocation/${id}`);
                    console.log(`  Rollback: נמחק RoomLocation ${id}`);
                } catch (rollbackErr) {
                    console.error(`  ⚠️ Rollback נכשל על ${id}:`, rollbackErr);
                }
            }

            // זריקת השגיאה מחדש לטיפול בבלוק החיצוני
            throw loopError;
        }

        // ─── שלב 5: הצלחה ───
        return res.json({
            success: true,
            message: "ההזמנה נקלטה בהצלחה",
            registeredId,
            roomLocations: createdRoomLocations,
            allocations: allocations.map(a => ({
                roomId: a.roomId,
                roomNum: a.roomNum,
                assignedGuests: a.assignedGuests
            }))
        });

    } catch (error: any) {
        console.error("❌ FULL ERROR IN confirmBooking");
        console.error("Message:", error.message);
        console.error("Response data:", error?.response?.data);
        console.error("Status:", error?.response?.status);
        console.error("URL:", error?.config?.url);

        return res.status(500).json({
            success: false,
            message: error.message,
            url: error?.config?.url,
            data: error?.response?.data
        });
    }
};