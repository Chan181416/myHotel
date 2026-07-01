// import { useLocation, useNavigate } from "react-router-dom";
// import "./BookingPreview.css";

// import React, { useState } from "react";

// function BookingPreview() {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const previewResult = location.state?.previewResult;
//     const formData = location.state?.formData;

//     if (!previewResult) {
//         return (
//             <div className="empty-state">
//                 <h2>אין נתוני הזמנה</h2>
//                 <button onClick={() => navigate("/basis")}>
//                     חזרה להזמנה
//                 </button>
//             </div>
//         );
//     }

//     const allocations = previewResult.allocations || [];

//     const confirmBooking = async () => {
//         try {
//             setLoading(true);

//             const response = await fetch(
//                 `${import.meta.env.VITE_API_URL}/api/booking/confirm-booking`,
//                 {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         formData,
//                         allocations: previewResult?.allocations || []
//                     })
//                 }
//             );

//             const result = await response.json();

//             console.log("BOOKING CONFIRMED:", result);

//             navigate("/basis"); // או למסך הצלחה אם יש לך
//         } catch (error) {
//             console.error("confirmBooking error:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="preview-page">

//             <div className="preview-card">

//                 <div className="header">
//                     <h1>🌊 סיכום הזמנת הנופש</h1>
//                     <p>
//                         {previewResult.message || "נמצאו חדרים מתאימים עבורך"}
//                     </p>
//                 </div>

//                 <div className="guest-box">
//                     <div><b>שם:</b> {formData?.name}</div>
//                     <div><b>טלפון:</b> {formData?.phone}</div>
//                     <div><b>תאריך:</b> {formData?.date}</div>
//                     <div><b>סוג מסלול:</b> {formData?.tripType}</div>
//                     <div><b>סוג חדר:</b> {formData?.roomType}</div>
//                 </div>

//                 <div className="rooms-title">
//                     חדרים שנמצאו עבורך
//                 </div>

//                 <div className="rooms-list">
//                     {allocations.map((room: any) => (
//                         <div key={room.roomId} className="room-card">
//                             <div className="room-num">
//                                 חדר {room.roomNum}
//                             </div>


//                             <div className="room-info">
//                                 {room.condition} שדרוג
//                             </div>


//                             <div className="room-info">
//                                 {room.assignedGuests} מקומות
//                             </div>
//                         </div>
//                     ))}
//                 </div>

//                 <div className="actions">
//                     <button
//                         className="btn secondary"
//                         onClick={() => navigate("/basis")}
//                     >
//                         חזרה לעריכה
//                     </button>

//                     <button
//                         className="btn primary"
//                         onClick={confirmBooking}
//                         disabled={loading}
//                     >
//                         {loading ? "מבצע הזמנה..." : "אישור הזמנה 🌴"}
//                     </button>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default BookingPreview;



import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPreview.css";

import React, { useState } from "react";

function BookingPreview() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const previewResult = location.state?.previewResult;
    const formData = location.state?.formData;

    if (!previewResult) {
        return (
            <div className="empty-state">
                <h2>אין נתוני הזמנה</h2>
                <button onClick={() => navigate("/basis")}>
                    חזרה להזמנה
                </button>
            </div>
        );
    }

    const allocations = previewResult.allocations || [];

    const confirmBooking = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/booking/confirm-booking`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        formData,
                        allocations: previewResult?.allocations || []
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`Request failed: ${response.status}`);
            }

            const result = await response.json();
            console.log("BOOKING CONFIRMED:", result);

        } catch (error) {
            console.error("confirmBooking error:", error);
        } finally {
            setLoading(false);
            navigate("/basis");
        }
    };

    return (
        <div className="preview-page">

            <div className="preview-card">

                <div className="header">
                    <h1>🌊 סיכום הזמנת הנופש</h1>
                    <p>
                        {previewResult.message || "נמצאו חדרים מתאימים עבורך"}
                    </p>
                </div>

                <div className="guest-box">
                    <div><b>שם:</b> {formData?.name}</div>
                    <div><b>טלפון:</b> {formData?.phone}</div>
                    <div><b>תאריך:</b> {formData?.date}</div>
                    <div><b>סוג מסלול:</b> {formData?.tripType}</div>
                    <div><b>סוג חדר:</b> {formData?.roomType}</div>
                </div>

                <div className="rooms-title">
                    חדרים שנמצאו עבורך
                </div>

                <div className="rooms-list">
                    {allocations.map((room: any) => (
                        <div key={room.roomId} className="room-card">
                            <div className="room-num">
                                חדר {room.roomNum}
                            </div>

                            <div className="room-info">
                                {room.conditionOption} שדרוג
                            </div>

                            <div className="room-info">
                                {room.assignedGuests} מקומות
                            </div>
                        </div>
                    ))}
                </div>

                {/* <div> {previewResult.message} הודעה </div> */}
                <div className="actions">
                    <button
                        className="btn secondary"
                        onClick={() => navigate("/basis")}
                    >
                        חזרה לעריכה
                    </button>

                    <button
                        className="btn primary"
                        onClick={confirmBooking}
                        disabled={loading}
                    >
                        {loading ? "מבצע הזמנה..." : "אישור הזמנה 🌴"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BookingPreview;
