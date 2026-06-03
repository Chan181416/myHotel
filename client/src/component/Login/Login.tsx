import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout } from "../../api/userSlice";
import "./login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [loginError, setLoginError] = useState(""); // הודעת שגיאה UI

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const { status, error } = user;

  const handleLogin = async () => {
    setLoginError(""); // איפוס הודעת שגיאה
    if (!username.trim() || !idNumber.trim()) {
      setLoginError("יש למלא את כל השדות");
      return;
    }

    try {
      const resultAction = await dispatch(loginUser({ username, idNumber }));

      if (loginUser.fulfilled.match(resultAction)) {
        const type = resultAction.payload.code;

        if (!type) {
          setLoginError("!אתה לא רשום במערכת, פנה למנהל");
          return;
        }

        if (type === 1) navigate("basis");
        else if (Number(type) === 2) navigate("home");
        else navigate("/");
      } else {
        setLoginError(
          "שגיאה בהתחברות: " +
            (resultAction.payload || resultAction.error.message)
        );
      }
    } 
    catch {
      setLoginError("שגיאה כללית בהתחברות");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
    setIdNumber("");
    setLoginError("");
    navigate("/");
  };

  return (
    <div id="page">
      <div id="container">
        <h1 className="title">מערכת כניסה</h1>

        {!user.type ? (
          <>
            <div className="inputGroup">
              <label className="label">שם משתמש</label>
              <input
                type="text"
                placeholder="הכנס שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
              />
            </div>

            <div className="inputGroup">
              <label className="label">תעודת זהות</label>
              <input
                type="text"
                placeholder="הכנס תעודת זהות"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="input"
              />
            </div>

            <button
              onClick={handleLogin}
              className="loginBtn"
              disabled={status === "loading"}
            >
              {status === "loading" ? "מתחבר..." : "כניסה למערכת"}
            </button>

            {/* הודעת שגיאה בתוך UI */}
            {loginError && <p className="errorText fadeIn">{loginError}</p>}
            {error && <p className="errorText fadeIn">{error}</p>}
          </>
        ) : (
          <div id="userBox">
            <h3 style={{ marginBottom: "15px" }}>משתמש מחובר</h3>

            <p>
              <strong>שם משתמש:</strong> {user.username}
            </p>
            <p>
              <strong>תעודת זהות:</strong> {user.idNumber}
            </p>
            <p>
              <strong>סוג משתמש:</strong> {user.type}
            </p>

            <button onClick={handleLogout} className="logoutBtn">
              התנתקות
            </button>
          </div>
        )}
      </div>
    </div>
  );
}