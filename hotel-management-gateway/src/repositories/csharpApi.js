const axios = require("axios");

// שליפת כל הנתונים הדרושים לבדיקת זמינות והלוגיקה
async function getFullRoomData(eventName) {
    try {
        // כל החדרים
        const roomsResponse = await axios.get("http://localhost:5000/api/RoomDB");
        const rooms = roomsResponse.data;

        // RoomLocation
        const roomLocationsResponse = await axios.get("http://localhost:5000/api/RoomLocation");
        const roomLocations = roomLocationsResponse.data;

        // Registereds
        const registeredsResponse = await axios.get("http://localhost:5000/api/Registereds");
        const registereds = registeredsResponse.data;

        // סינון נרשמים לפי Event המבוקש
        const filteredRegistereds = registereds.filter(r => r.Event?.Event === eventName);

        return {
            rooms,
            roomLocations,
            registereds: filteredRegistereds
        };
    }
    catch (error) {
        console.error(
            "שגיאה בשליפת נתונים משרת C#:"
        );

        if (error.response) {
            console.error("קוד שגיאה:", error.response.status);
        }

        console.error("פירוט:", error.message);

        return {
            rooms: [],
            roomLocations: [],
            registereds: []
        };
    }
}


module.exports = {
    getFullRoomData
};