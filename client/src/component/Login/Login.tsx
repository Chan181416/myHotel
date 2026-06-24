import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout } from "../../api/userSlice";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [submitted, setSubmitted] = useState(false); // ← שיניתי מ-touched

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const { status, error } = user;

  const isFormValid =
    username.trim().length > 0 && idNumber.trim().length > 0;

  const isIdValid = /^\d{9}$/.test(idNumber);

  const handleLogin = async () => {
    setSubmitted(true); // ← סימון שהיה ניסיון שליחה

    if (!isFormValid || !isIdValid) return;

    const resultAction = await dispatch(
      loginUser({ username, idNumber })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      const type = resultAction.payload.code;

      if (Number(type) === 1) {
        navigate("/basis");
      } else if (Number(type) === 2) {
        navigate("/dataBase");
      }
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
    setIdNumber("");
    navigate("/");
  };

  // נאתחל submitted כשמשנה שדה
  const handleFieldChange = (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSubmitted(false); // ← איפוס כדי שהשגיאה תיעלם כשמתקנים
      setter(e.target.value);
    };

  return (
    <div className="page">
      <div className="loginCard">
        <h1 className="title">מערכת כניסה</h1>

        {!user.type ? (
          <>
            <div className="inputWrapper">
              <label>שם משתמש</label>
              <input
                value={username}
                onChange={handleFieldChange(setUsername)}
                className="input"
                placeholder="הכנס שם משתמש"
              />
            </div>

            <div className="inputWrapper">
              <label>תעודת זהות</label>
              <input
                value={idNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                  setSubmitted(false);
                  setIdNumber(value);
                }}
                className="input"
                placeholder="הכנס תעודת זהות"
              />
            </div>

            {/* שגיאה רק אחרי לחיצה על אישור והשדות ריקים */}
            {submitted && !isFormValid && (
              <div className="errorText">
                יש למלא את כל השדות לפני ההמשך!
              </div>
            )}

            {submitted && isFormValid && !isIdValid && (
              <div className="errorText">
                מספר תעודת זהות חייב להכיל 9 ספרות
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={status === "loading"}
              className="loginBtn"
            >
              {status === "loading" ? "מתחבר..." : "כניסה למערכת"}
            </button>

            {/* שגיאה מהשרת */}
            {error && <div className="errorText">{error}</div>}
          </>
        ) : (
          <div className="userBox">
            <h3>משתמש מחובר</h3>

            <p>שם משתמש: {user.username}</p>
            <p>תעודת זהות: {user.idNumber}</p>
            <p>סוג משתמש: {user.type}</p>

            <button onClick={handleLogout} className="logoutBtn">
              התנתקות
            </button>
          </div>
        )}
      </div>
    </div>
  )
}