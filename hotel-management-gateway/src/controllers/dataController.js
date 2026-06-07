
// const axios = require("axios");

// exports.loadData = async (req, res) => {
//   try {

//     // נתונים שהגיעו מהלקוח
//     const formData = req.body;

//     const {
//       id,
//       name,
//       phone,
//       email,
//       date,
//       tripType,
//       roomType,
//       guests
//     } = formData;

//     // נתונים שמגיעים מ־C#
//     const [registeredsResponse, roomsResponse] = await Promise.all([
//       axios.get("http://localhost:5044/api/Registereds"),
//       axios.get("http://localhost:5044/api/RoomsDB")
//     ]);

//     const registereds = registeredsResponse.data;
//     const rooms = roomsResponse.data;


//     exports.filterByConditionAndEvent = async (req, res) => {
//       try {
//         // נניח שכבר קיבלת registeredsResponse מה-API
//         const registereds = req.body.registereds; // אפשר גם להביא ממקור אחר

//         // נתוני לקוח (למשל roomType ו-tripType)
//         const { conditionId, eventId } = req.body; // שליחה מהלקוח

//         // סינון לפי Condition ו-Event
//         const filtered = registereds.filter(reg =>
//           reg.ConditionId === conditionId && reg.PriceListId === eventId
//         );

//         // חלוקה לפי סוג Event
//         const grouped = {
//           'נופש מלא': [],
//           'יום א': [],
//           'יום ב': []
//         };

//         filtered.forEach(reg => {
//           if (reg.Event?.Event === 'נופש מלא') grouped['נופש מלא'].push(reg);
//           else if (reg.Event?.Event === 'יום א') grouped['יום א'].push(reg);
//           else if (reg.Event?.Event === 'יום ב') grouped['יום ב'].push(reg);
//         });

//         // שולח את התוצאה ללקוח או להמשך עיבוד
//         res.json({ grouped });

//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: err.message });
//       }
//     }

//   }

// }
const axios = require("axios");

exports.loadData = async (req, res) => {
  try {
    // נתונים שהגיעו מהלקוח
    const formData = req.body;

    const {
      id,
      name,
      phone,
      email,
      date,
      tripType,
      roomType,
      guests,
      conditionId,
      eventId
    } = formData;

    // נתונים שמגיעים מ־C#
    const [registeredsResponse, roomsResponse] = await Promise.all([
      axios.get("http://localhost:5044/api/Registereds"),
      axios.get("http://localhost:5044/api/RoomsDB")
    ]);

    const registereds = registeredsResponse.data;
    const rooms = roomsResponse.data;

    // סינון לפי Condition ו-Event
    const filtered = registereds.filter(reg =>
      reg.ConditionId === conditionId && reg.PriceListId === eventId
    );

    // חלוקה לפי סוג Event
    const grouped = {
      'נופש מלא': [],
      'יום א': [],
      'יום ב': []
    };

    filtered.forEach(reg => {
      if (reg.Event?.Event === 'נופש מלא') grouped['נופש מלא'].push(reg);
      else if (reg.Event?.Event === 'יום א') grouped['יום א'].push(reg);
      else if (reg.Event?.Event === 'יום ב') grouped['יום ב'].push(reg);
    });

    // מחזיר גם את הנתונים של הלקוח וגם את התוצאה מהסינון
    res.json({
      clientData: formData,
      rooms: rooms,
      groupedRegistereds: grouped
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }"אני צריכה להמשיך במקום של לחשוב איך לסדר ולבדוק אתהתנאים האם אפשר לשים הכניס כמה הזמנות לאותו חדר וכן אם יום ב תפוס והוא רוצה יום אכן יכול להיכנס בקיצור לעבוד על זה היטב וכן אם אין בכלל כזה חדר לפי התנאים להודיע שאין ישירד מהתנאים בקיצור לבדוק איך בידיוק להמשיך משם!!!"
};