const axios = require("axios");

async function getAvailableRoomsByEvent(eventName) {
    try {
        // שולחים בקשה לשרת C# לקבל את כל החדרים
        const roomsResponse = await axios.get("http://localhost:5000/api/rooms");
        const allRooms = roomsResponse.data;

        // שולפים את RoomLocation והזמנות קיימות
        const roomLocationResponse = await axios.get("http://localhost:5000/api/roomlocation");
        const roomLocations = roomLocationResponse.data;

        const registeredsResponse = await axios.get("http://localhost:5000/api/registereds");
        const registereds = registeredsResponse.data;

        const pricesResponse = await axios.get("http://localhost:5000/api/priceslist");
        const pricesList = pricesResponse.data;

        // מסננים חדרים תפוסים באותו אירוע
        const unavailableRoomIds = roomLocations
            .map(rl => {
                const reg = registereds.find(r => r.id === rl.RegisteredsId);
                if (!reg) return null;

                const price = pricesList.find(p => p.Event === eventName && p.IdPrice === reg.EventId);
                return price ? rl.Rooms : null;
            })
            .filter(id => id !== null);

        // מחזירים רק חדרים פנויים
        const availableRooms = allRooms.filter(room => !unavailableRoomIds.includes(room.Id));

        return availableRooms;

    } catch (error) {
        console.error("Error fetching rooms from C# server:", error.message);
        return [];
    }
}

module.exports = { getAvailableRoomsByEvent };