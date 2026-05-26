// import Home from '../Home/Home'
// import './Basis.css'
// import React from "react";
// import { Link } from "react-router-dom";


// function Basis() {

//     return (
//         <>
//             <div id="welcome">
//                 <div id="container">
//                     <div className="form">

//                         <h2>רישום אורח למלון</h2>

//                         <div className="row">
//                             <div className="field">
//                                 <label>ת.ז. נרשמת</label>
//                                 <input type="text" placeholder="מס' זהות/מס' רישום" />
//                             </div>

//                             <div className="field">
//                                 <label>שם מתארחת</label>
//                                 <input type="email" placeholder="הכנס שם מתארחת" />
//                             </div>
//                         </div>

//                         <div className="row">
//                             <div className="field">
//                                 <label>טלפון</label>
//                                 <input type="text" placeholder="מספר טלפון" />
//                             </div>

//                             <div className="field">
//                                 <label>אימייל</label>
//                                 <input type="email" placeholder="אימייל" />
//                             </div>
//                         </div>

//                         <div className="field">
//                             <label>תאריך הזמנה</label>
//                             <input type="date" />
//                         </div>

//                         <div className="field">
//                             <label>סוג מסלול</label>
//                             <select>
//                                 <option>נופש מלא</option>
//                                 <option>יום א</option>
//                                 <option>יום ב</option>
//                             </select>
//                         </div>
//                         <div className="field">
//                             <label>סוג חדר</label>
//                             <select>
//                                 <option>אקסטרה</option>
//                                 <option>מול הים</option>
//                             </select>
//                         </div>

//                         <div className="field">
//                             <label>מספר אורחים</label>
//                             <input type="number" min="1" max="5" />
//                         </div>

//                         <button><Link to="/about">עבור לאודות</Link></button>                    </div>
//                     <button><Link to="/about">לאישור</Link></button>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Basis


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Basis.css';

function Basis() {   

    // סטייט לכל השדות
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        phone: "",
        email: "",
        date: "",
        tripType: "",
        roomType: "",
        guests: 1
    });

    // עדכון הסטייט כשמשתמש מקליד
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // פונקציה שמאשרת ושומרת
    const handleSubmit = () => {
        // יוצרים מחרוזת לאישור
        const message = `
            ת.ז: ${formData.id}
            שם מתארחת: ${formData.name}
            טלפון: ${formData.phone}
            אימייל: ${formData.email}
            תאריך הזמנה: ${formData.date}
            סוג מסלול: ${formData.tripType}
            סוג חדר: ${formData.roomType}
            מספר אורחים: ${formData.guests}`;
        

        // שואל את המשתמש לאישור
        const confirmed = window.confirm(message);
        if (confirmed) {
            localStorage.setItem("guestData", JSON.stringify(formData));
            navigate("/about"); // מעבר לדף הבא
        }
    };

    return (
        <div id="welcome">
            <div id="allTheForm">
                <div className="form">
                    <h2>רישום אורח למלון</h2>

                    <div className="row">
                        <div className="field">
                            <label>ת.ז. נרשמת</label>
                            <input
                                type="text"
                                name="id"
                                placeholder="מס' זהות"
                                value={formData.id}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="field">
                            <label>שם מתארחת</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="שם מתארחת"
                                value={formData.name}
                                onChange={handleChange}
                            />
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
                            // placeholder="לחץ לבחירה"
                            value={formData.tripType}
                            onChange={handleChange}
                        >
                            <option>נופש מלא</option>
                            <option>יום א</option>
                            <option>יום ב</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>סוג חדר</label>
                        <select
                            name="roomType"
                            value={formData.roomType}
                            onChange={handleChange}
                        >
                            <option>רגיל</option>
                            <option>אקסטרה</option>
                            <option>מול הים</option>
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

                    <button onClick={handleSubmit}>לאישור</button>
                </div>
            </div>
        </div>
    );
}

export default Basis;

