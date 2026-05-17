import Home from '../Home/Home'
import './Basis.css'
import React from "react";
import { Link } from "react-router-dom";


function Basis() {

    return (
        <>
            <div id="welcome">
                <div id="container">
                    <div className="form">

                        <h2>רישום אורח למלון</h2>

                        <div className="row">
                            <div className="field">
                                <label>ת.ז. נרשמת</label>
                                <input type="text" placeholder="מס' זהות/מס' רישום" />
                            </div>

                            <div className="field">
                                <label>שם מתארחת</label>
                                <input type="email" placeholder="הכנס שם מתארחת" />
                            </div>
                        </div>

                        <div className="row">
                            <div className="field">
                                <label>טלפון</label>
                                <input type="text" placeholder="מספר טלפון" />
                            </div>

                            <div className="field">
                                <label>אימייל</label>
                                <input type="email" placeholder="אימייל" />
                            </div>
                        </div>

                        <div className="field">
                            <label>תאריך הזמנה</label>
                            <input type="date" />
                        </div>

                        <div className="field">
                            <label>סוג מסלול</label>
                            <select>
                                <option>נופש מלא</option>
                                <option>יום א</option>
                                <option>יום ב</option>
                            </select>
                        </div>
                        <div className="field">
                            <label>סוג חדר</label>
                            <select>
                                <option>אקסטרה</option>
                                <option>מול הים</option>
                            </select>
                        </div>

                        <div className="field">
                            <label>מספר אורחים</label>
                            <input type="number" min="1" max="5" />
                        </div>

                        <button><Link to="/about">עבור לאודות</Link></button>                    </div>
                    <button><Link to="/about">לאישור</Link></button>
                </div>
            </div>
        </>
    )
}

export default Basis
