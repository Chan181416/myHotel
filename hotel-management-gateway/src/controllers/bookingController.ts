
import axios from "axios";
import { Request, Response } from "express";
export const confirmBooking = async (req: Request, res: Response) => {
    console.log("confirmBooking called");
    console.log(req.body);
    try {
        const { formData, allocations } = req.body;

        for (const alloc of allocations) {

            // 1. create registered

            const eventGuid = await axios.get(`${process.env.CSHARP_API}/PricesList/idbyevent/${formData.tripType}`)
            console.log("הצלחת");
            console.log({ eventGuid });


            const conditionGuid = await axios.get(`${process.env.CSHARP_API}/Condition/idbyoption/${formData.roomType}`)
            console.log("הצלחת");
            console.log({ conditionGuid });


            const regRes = await axios.post(
                `${process.env.CSHARP_API}/registereds`,
                {

                    NumberId: formData.id,
                    Name: formData.name,
                    SumPlace: alloc.assignedGuests,
                    TotalPrice: 0,
                    Event: eventGuid.data,
                    Condition: conditionGuid.data,

                }
            );
            console.log("נכנס לרגי");

            const registeredId = regRes.data.id;

            // 2. create roomLocation
            const roomLocRes = await axios.post(
                `${process.env.CSHARP_API}/api/roomLocation`,
                {
                    rooms: alloc.roomId,
                    registeredsId: registeredId
                }
            );

            const roomLocationId = roomLocRes.data.id;
            console.log("נכנס לרומי");

            // 3. attach to room
            await axios.put(
                `${process.env.CSHARP_API}/RoomDB/add-room-location`,
                {
                    roomId: alloc.roomId,
                    roomLocationId
                }
            );
            break;
        }
        console.log("נכנס ללוקי");
    // }
    //     catch (err: any) {
    //         return res.status(500).json({
    //             success: false,
    //             message: err.message,
    //             stack: err.stack
    //         });
    //     }
    } catch (error: any) {

        console.error("FULL ERROR");

        console.error(error?.response?.data);

        console.error(error?.response?.status);

        console.error(error?.config?.url);

        return res.status(500).json({
            success: false,
            message: error.message,
            url: error?.config?.url,
            data: error?.response?.data
        });
    }
};