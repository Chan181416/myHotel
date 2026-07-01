import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="adminPage">
      <div className="adminCard">
        <h1 className="adminTitle">ניהול מערכת</h1>
        <p className="adminSubtitle">בחר יעד להמשך עבודה</p>

        <div className="grid">
          <div className="navBox" onClick={() => navigate("/dataBase")}>
            <h3>Database</h3>
            <p>מילוי ועדכון טבלאות מידע</p>
          </div>

          <div className="navBox" onClick={() => navigate("/basis")}>
            <h3>Basis</h3>
            <p>רישום משתמשים למערכת</p>
          </div>

          <div className="navBox" onClick={() => navigate("/finalRegistration")}>
            <h3>Final Registration</h3>
            <p>סיכום נרשמים וחדרים</p>
          </div>
        </div>
      </div>
    </div>
  );
}