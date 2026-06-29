
// import axios from "axios";
// import { Request, Response } from "express";
// export const confirmBooking = async (req: Request, res: Response) => {
//     console.log("confirmBooking called");
//     console.log(req.body);
//     try {
//         const { formData, allocations } = req.body;

//         const eventGuid = await axios.get(`${process.env.CSHARP_API}/PricesList/idbyevent/${formData.tripType}`)
//         console.log("הצלחת");
//         console.log({ eventGuid });


//         const conditionGuid = await axios.get(`${process.env.CSHARP_API}/Condition/idbyoption/${formData.roomType}`)



//         const price1 = await axios.get(`${process.env.CSHARP_API}/PricesList/price/${eventGuid.data}`)



//         const price2 = await axios.get(`${process.env.CSHARP_API}/Condition/${conditionGuid.data}`)

//         const price = (Number(price1.data) + Number(price2.data)) * (formData.guests);

//         const regRes = await axios.post(
//             `${process.env.CSHARP_API}/registereds`,
//             {

//                 NumberId: formData.id,
//                 Name: formData.name,
//                 SumPlace: formData.guests,
//                 TotalPrice: price,
//                 Event: eventGuid.data,
//                 Condition: conditionGuid.data,

//             }
//         );
//         const registeredId = regRes.data.id;
//         console.log("נכנס לרגי");



//         for (const alloc of allocations) {


//             // 2. create roomLocation
//             const roomLocRes = await axios.post(
//                 `${process.env.CSHARP_API}/api/roomLocation`,
//                 {
//                     registeredsId: registeredId,
//                     rooms: alloc.roomId

//                 }
//             );

//             const roomLocationId = roomLocRes.data.id;
//             console.log("נכנס לרומי");

//             // 3. attach to room
//             await axios.put(
//                 `${process.env.CSHARP_API}/RoomDB/add-room-location`,
//                 {
//                     roomId: alloc.roomId,
//                     roomLocationId
//                 }
//             );

//              console.log("נכנס ללוקי");

//         }

//     } catch (error: any) {

//         console.error("FULL ERROR");

//         console.error(error?.response?.data);

//         console.error(error?.response?.status);

//         console.error(error?.config?.url);

//         return res.status(500).json({
//             success: false,
//             message: error.message,
//             url: error?.config?.url,
//             data: error?.response?.data
//         });
//     }
// };




import axios from "axios"
import { Request, Response } from "express";

export const confirmBooking = async (req: Request, res: Response) => {
    console.log("confirmBooking called");
    console.log(req.body);

    try {
        const { formData, allocations } = req.body;


        const eventGuid = await axios.get(
            `${process.env.CSHARP_API}/PricesList/idbyevent/${formData.tripType}`
        );

        const conditionGuid = await axios.get(
            `${process.env.CSHARP_API}/Condition/idbyoption/${formData.roomType}`
        );

        const price1 = await axios.get(
            `${process.env.CSHARP_API}/PricesList/price/${eventGuid.data}`
        );

        const price2 = await axios.get(
            `${process.env.CSHARP_API}/Condition/${conditionGuid.data}`
        );

        const price = Number(price1.data) + Number(price2.data);

        const regRes = await axios.post(
            `${process.env.CSHARP_API}/registereds`,
            {
                NumberId: formData.id,
                Name: formData.name,
                SumPlace: formData.guests,
                TotalPrice: price,
                Event: eventGuid.data,
                Condition: conditionGuid.data,
            }
        );

        const registeredId = regRes.data.id;

        for (const alloc of allocations) {



            const roomLocRes = await axios.post(
                `${process.env.CSHARP_API}/api/roomLocation`,
                {
                    registeredsId: registeredId,
                    rooms: alloc.roomId
                }
            );

            const roomLocationId = roomLocRes.data.id;

            await axios.put(
                `${process.env.CSHARP_API}/RoomDB/add-room-location`,
                {
                    roomId: alloc.roomId,
                    roomLocationId
                }
            );
        }

        return res.json({
            success: true
        });

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

