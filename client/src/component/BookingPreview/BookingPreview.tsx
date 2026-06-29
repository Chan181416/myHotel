import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPreview.css";

function BookingPreview() {
    const location = useLocation();
    const navigate = useNavigate();

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
                                {room.assignedGuests} אורחים
                            </div>
                        </div>
                    ))}
                </div>

                <div className="actions">
                    <button
                        className="btn secondary"
                        onClick={() => navigate("/basis")}
                    >
                        חזרה לעריכה
                    </button>

                    <button
                        className="btn primary"
                        onClick={() => console.log("confirm booking")}
                    >
                        אישור הזמנה 🌴
                    </button>
                </div>

            </div>
        </div>
    );
}

export default BookingPreview;