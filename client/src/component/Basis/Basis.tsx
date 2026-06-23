

import React, { useState } from "react";
import './Basis.css';

function Basis() {
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
        date: "",
        tripType: "נופש_מלא",
        roomType: "אקסטרה",
        guests: 1
    });

    const [errors, setErrors] = useState({
        id: "",
        name: "",
        phone: "",
        email: ""
    });
    const baseUrl = import.meta.env.VITE_API_URL;

    // פונקציה לבדיקה בזמן אמת של כל שדה
    const validateField = (name, value) => {
        switch (name) {
            case "id":
                return /^\d{9}$/.test(value) ? "" : "תעודת זהות חייבת להכיל 9 ספרות";
            case "name":
                return /^[א-תa-zA-Z\s]+$/.test(value.trim()) ? "" : "שם לא תקין";
            case "phone":
                return /^0\d{9}$/.test(value) ? "" : "מספר טלפון לא תקין";
            case "email":
                return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "כתובת מייל לא תקינה";
            default:
                return "";
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setErrors(prev => ({
            ...prev,
            [name]: validateField(name, value)
        }));
    };

    // בדיקה כוללת לפני שליחה
    const validateForm = () => {
        const newErrors = {
            id: "",
            name: "",
            phone: "",
            email: ""
        };
        ["id", "name", "phone", "email"].forEach(field => {
            newErrors[field] = validateField(field, formData[field]);
        });
        setErrors(newErrors);
        // תקין אם אין שגיאות בשדות חובה
        return !["id", "name", "phone"].some(field => newErrors[field]);
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const message = `
ת.ז: ${formData.id}
שם מתארחת: ${formData.name}
טלפון: ${formData.phone}
אימייל: ${formData.email}
תאריך הזמנה: ${formData.date}
סוג מסלול: ${formData.tripType}
סוג חדר: ${formData.roomType}
מספר אורחים: ${formData.guests}
`;

        const confirmed = window.confirm(message);
        if (!confirmed) return;

        try {
            const response = await fetch(`${baseUrl}/api/data/loadData`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("Response from server:", result);
        } catch (error) {
            console.error("Error sending data to server:", error);
        }
    };

    // מצב כפתור שמושבת אם יש שגיאות או שדות ריקים
    const isFormValid = ["id", "name", "phone"].every(field => formData[field].trim() && !errors[field]);

    return (
        <div id="welcome">
            <div id="container">
                <div className="form">
                    <h2>רישום אורח למלון</h2>

                    <div className="row">
                        <div className="field">
                            <label>ת.ז. נרשמת</label>
                            <input
                                type="text"
                                name="id"
                                placeholder="מס' זהות/מס' רישום"
                                value={formData.id}
                                onChange={handleChange}
                            />
                            {errors.id && <div className="error-message">{errors.id}</div>}
                        </div>

                        <div className="field">
                            <label>שם מתארחת</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="הכנס שם מתארחת"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {errors.name && <div className="error-message">{errors.name}</div>}
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
                            {errors.phone && <div className="error-message">{errors.phone}</div>}
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
                            {errors.email && <div className="error-message">{errors.email}</div>}
                        </div>
                    </div>

                    <div className="field">
                        <label>תאריך הזמנה</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>סוג מסלול</label>
                        <select
                            name="tripType"
                            value={formData.tripType}
                            onChange={handleChange}
                        >
                            <option>נופש_מלא</option>
                            <option>יום_א</option>
                            <option>יום_ב</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>סוג חדר</label>
                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                        >
                            <option>אקסטרה</option>
                            <option>מול_הים</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>מספר אורחים</label>
                        <input
                            type="number"
                            name="guests"
                            min="1"
                            max="5"
                            value={formData.guests}
                            onChange={handleChange}
                        />
                    </div>

                    <button onClick={handleSubmit} disabled={!isFormValid}>
                        לאישור
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Basis;