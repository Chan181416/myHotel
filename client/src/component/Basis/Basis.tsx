import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Basis.css";

const baseUrl = import.meta.env.VITE_API_URL;

function Basis() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
        date: "",
        tripType: "נופש_מלא",
        roomType: "רגיל",
        guests: 1
    });
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [errors, setErrors] = useState({
        id: "",
        name: "",
        phone: "",
        email: ""
    });
    const baseUrl = import.meta.env.VITE_API_URL;

    const [previewResult, setPreviewResult] = useState<any>(null);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateField = (name: string, value: string) => {
        switch (name) {
            case "id":
                return /^\d{9}$/.test(value)
                    ? ""
                    : "תעודת זהות חייבת להכיל 9 ספרות";

            case "name":
                return /^[א-תa-zA-Z\s]+$/.test(value.trim())
                    ? ""
                    : "שם לא תקין";

            case "phone":
                return /^0\d{9}$/.test(value)
                    ? ""
                    : "מספר טלפון לא תקין";

            case "email":
                return !value ||
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                    ? ""
                    : "כתובת מייל לא תקינה";

            default:
                return "";
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        const isNumberField = name === "guests";

        const parsedValue = isNumberField
            ? Number(value)
            : value;

        setFormData(prev => ({
            ...prev,
            [name]: parsedValue
        }));

        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    const validateForm = () => {
        const newErrors = {
            id: "",
            name: "",
            phone: "",
            email: ""
        };

        ["id", "name", "phone", "email"].forEach(field => {
            newErrors[field as keyof typeof newErrors] =
                validateField(
                    field,
                    formData[field as keyof typeof formData] as string
                );
        });

        setErrors(newErrors);

        return !["id", "name", "phone"].some(
            field =>
                newErrors[field as keyof typeof newErrors]
        );
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        try {
            setLoading(true);

            const response = await fetch(
                `${baseUrl}/api/data/loadData`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            // setPreviewResult(result.result);
            // setShowPreviewModal(true);

            navigate("/bookingPreview", {
                state: {
                    previewResult: result.result,
                    formData
                }
            });

        } catch (error) {
            console.error(
                "Error sending data to server:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const confirmBooking = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${baseUrl}/api/booking/confirm-booking`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        formData,
                        allocations:
                            previewResult?.allocations || []
                    })
                }
            );

            const result = await response.json();

            console.log(result);

            setShowPreviewModal(false);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = [
        "id",
        "name",
        "phone"
    ].every(
        field =>
            formData[
                field as keyof typeof formData
            ]
                .toString()
                .trim() &&
            !errors[
            field as keyof typeof errors
            ]
    );

    return (
        <>
            <div id="welcome">
                <div className="contain">
                    <h2>רישום אורח למלון</h2>

                    <p className="subtitle">
                        השלמת פרטי ההרשמה לימי הנופש
                    </p>

                    <div className="row">
                        <div className="field">
                            <label>
                                ת.ז. נרשמת
                            </label>

                            <input
                                type="text"
                                name="id"
                                placeholder="מס' זהות/מס' רישום"
                                value={formData.id}
                                onChange={handleChange}
                            />

                            {errors.id && (
                                <div className="error-message">
                                    {errors.id}
                                </div>
                            )}
                        </div>

                        <div className="field">
                            <label>
                                שם מתארחת
                            </label>

                            <input
                                type="text"
                                name="name"
                                placeholder="הכנס שם מתארחת"
                                value={formData.name}
                                onChange={handleChange}
                            />

                            {errors.name && (
                                <div className="error-message">
                                    {errors.name}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="field">
                            <label>טלפון</label>

                            <input
                                type="text"
                                name="phone"
                                placeholder="מספר טלפון"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            {errors.phone && (
                                <div className="error-message">
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div className="field">
                            <label>אימייל</label>

                            <input
                                type="email"
                                name="email"
                                placeholder="אימייל"
                                value={formData.email}
                                onChange={handleChange}
                            />

                            {errors.email && (
                                <div className="error-message">
                                    {errors.email}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="field">
                        <label>
                            תאריך הזמנה
                        </label>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>
                            סוג מסלול
                        </label>

                        <select
                            name="tripType"
                            value={formData.tripType}
                            onChange={handleChange}
                        >
                            <option value="נופש_מלא">
                                נופש מלא
                            </option>

                            <option value="יום_א">
                                יום א
                            </option>

                            <option value="יום_ב">
                                יום ב
                            </option>
                        </select>
                    </div>

                    <div className="field">
                        <label>
                            סוג חדר
                        </label>

                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                        >
                            <option value="רגיל">
                                רגיל
                            </option>

                            <option value="אקסטרה">
                                אקסטרה
                            </option>

                            <option value="מול_הים">
                                מול הים
                            </option>
                        </select>
                    </div>

                    <div className="field">
                        <label>
                            מספר אורחים
                        </label>

                        <input
                            type="number"
                            name="guests"
                            min="1"
                            max="50"
                            value={formData.guests}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={
                            !isFormValid || loading
                        }
                    >
                        {loading
                            ? "מחפש חדרים..."
                            : "לאישור"}
                    </button>
                    {user.type === 2 && (
                        <button
                            type="button"
                            onClick={() => navigate("/admin")}
                        >
                            חזרה ללוח הבקרה
                        </button>
                    )}
                </div>
            </div>

            {showPreviewModal &&
                previewResult && (
                    <div className="modal-overlay">
                        <div className="modal-content">

                            <h3>
                                סיכום שיבוץ חדרים
                            </h3>

                            <p>
                                {previewResult.message ||
                                    "נמצאו חדרים מתאימים"}
                            </p>

                            <ul>
                                {previewResult.allocations?.map(
                                    (
                                        room: any
                                    ) => (
                                        <li
                                            key={
                                                room.roomId
                                            }
                                        >
                                            חדר{" "}
                                            {
                                                room.roomNum
                                            }{" "}
                                            -{" "}
                                            {
                                                room.assignedGuests
                                            }{" "}
                                            מקומות
                                        </li>
                                    )
                                )}
                            </ul>

                            <div className="modal-buttons">
                                <button
                                    onClick={() =>
                                        setShowPreviewModal(
                                            false
                                        )
                                    }
                                >
                                    ביטול
                                </button>

                                <button
                                    disabled={
                                        loading
                                    }
                                    onClick={
                                        confirmBooking
                                    }
                                >
                                    {loading
                                        ? "מבצע הזמנה..."
                                        : "אישור הזמנה"}
                                </button>
                            </div>

                        </div>
                    </div>
                )}
        </>
    );
}

export default Basis;