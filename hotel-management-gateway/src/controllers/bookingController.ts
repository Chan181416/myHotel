
import axios from "axios";
import { Request, Response } from "express";

export const confirmBooking = async (req: Request, res: Response) => {
    try {
        const { formData, allocations } = req.body;

        for (const alloc of allocations) {

            // 1. create registered
            const regRes = await axios.post(
                `${process.env.CSHARP_API}/registereds`,
                {
                    ...formData,
                    SumPlace: alloc.assignedGuests
                }
            );

            const registeredId = regRes.data.id;

            // 2. create roomLocation
            const roomLocRes = await axios.post(
                `${process.env.CSHARP_API}/roomLocation`,
                {
                    rooms: alloc.roomId,
                    registeredsId: registeredId
                }
            );

            const roomLocationId = roomLocRes.data.id;

            // 3. attach to room
            await axios.put(
                `${process.env.CSHARP_API}/RoomDB/add-room-location`,
                {
                    roomId: alloc.roomId,
                    roomLocationId
                }
            );
        }

        return res.json({
            success: true,
            message: "Booking confirmed"
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};