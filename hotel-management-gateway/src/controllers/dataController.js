// const axios = require("axios");

// exports.loadData = async (req, res) => {
//   try {
//     const formData = req.body;

//     console.log("Before:", formData);

//     // 🔹 שליפת eventId לפי event string
//     const eventResponse = await axios.get(
//       `http://localhost:5044/api/PricesList/idbyevent/${encodeURIComponent(formData.event)}`
//     );

//     const eventId = eventResponse.data;

//     // 🔥 כאן קורה ההחלפה האמיתית בתוך אותו אובייקט
//     formData.event = eventId;

//     console.log("After:", formData);

//     const {
//       id,
//       name,
//       phone,
//       email,
//       date,
//       tripType,
//       roomType,
//       guests,
//       conditionId,
//       event // עכשיו זה כבר GUID ולא string
//     } = formData;

//     // המשך עבודה רגיל
//     const [registeredsResponse, roomsResponse] = await Promise.all([
//       axios.get("http://localhost:5044/Registereds"),
//       axios.get("http://localhost:5044/RoomDB")
//     ]);

//     const registereds = registeredsResponse.data;
//     const rooms = roomsResponse.data;

//     const filtered = registereds.filter(reg =>
//       reg.ConditionId === conditionId &&
//       reg.PriceListId === event
//     );

//     const grouped = {
//       'נופש מלא': [],
//       'יום א': [],
//       'יום ב': []
//     };

//     filtered.forEach(reg => {
//       if (reg.Event?.Event === 'נופש מלא') grouped['נופש מלא'].push(reg);
//       else if (reg.Event?.Event === 'יום א') grouped['יום א'].push(reg);
//       else if (reg.Event?.Event === 'יום ב') grouped['יום ב'].push(reg);
//     });

//     res.json({
//       clientData: formData,
//       rooms,
//       groupedRegistereds: grouped
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };
const axios = require("axios");

exports.loadData = async (req, res) => {
  try {
    const formData = req.body;

    // 🔹 שמירת הערכים המקוריים למקרה שנרצה fallback
    const originalTripType = formData.tripType;
    const originalRoomType = formData.roomType;

    // 🔹 שליפת tripTypeId (event) בצורה בטוחה
    let tripTypeId = null;
    try {
      const eventResponse = await axios.get(
        `http://localhost:5044/PricesList/idbyevent/${encodeURIComponent(originalTripType)}`
      );
      tripTypeId = eventResponse.data;
    } catch (err) {
      console.warn(`Event '${originalTripType}' לא נמצא. המשך עם null.`);
    }
    formData.tripType = tripTypeId;

    // 🔹 שליפת conditionId בצורה בטוחה
    let conditionId = null;
    try {
      const conditionResponse = await axios.get(
        `http://localhost:5044/Condition/idbyoption/${encodeURIComponent(originalRoomType)}`
      );
      conditionId = conditionResponse.data;
    } catch (err) {
      console.warn(`Condition '${originalRoomType}' לא נמצא. המשך עם null.`);
    }
    formData.roomType = conditionId;

    console.log("After IDs replacement:", formData);

    const { id, name, phone, email, date, tripType, roomType, guests } = formData;

    // 🔹 שליפת נתונים נוספים מהשרת
    const [registeredsResponse, roomsResponse] = await Promise.all([
      axios.get("http://localhost:5044/Registereds"),
      axios.get("http://localhost:5044/RoomDB")
    ]);

    const registereds = registeredsResponse.data;
    const rooms = roomsResponse.data;

    // 🔹 סינון רק אם קיימים IDs חוקיים
    // const filtered = registereds.filter(reg =>
    //   reg.ConditionId === conditionId &&
    //   reg.PriceListId === tripType
    // );

    const grouped = {
      'נופש מלא': [],
      'יום א': [],
      'יום ב': []
    };

    // filtered.forEach(reg => {
    //   if (reg.Event?.Event === 'נופש מלא') grouped['נופש מלא'].push(reg);
    //   else if (reg.Event?.Event === 'יום א') grouped['יום א'].push(reg);
    //   else if (reg.Event?.Event === 'יום ב') grouped['יום ב'].push(reg);
    // });

    res.json({
      clientData: formData,
      rooms,
      groupedRegistereds: grouped
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};