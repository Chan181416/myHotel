// Role.controller.js
// Controller שאחראי על כל מה שקשור ל-Role

const api = require("../services/csharp.service"); // שירות שמבצע קריאות לשרת C#

exports.getByNameAndId = async (req, res) => {
    const { username, idNumber } = req.params; // הפרמטרים שנשלחים מה-URL
    try {
        const response = await api.get(`Role/getByNameAndId/${username}/${idNumber}`);
        res.status(200).json(response.data); // מחזיר את הנתונים כ-JSON
    } catch (err) {
        res.status(500).json({ message: err.message }); // במקרה של שגיאה
    }
};