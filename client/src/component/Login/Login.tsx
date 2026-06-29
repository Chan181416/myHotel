
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import { loginUser, logout } from "../../api/userSlice";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const { status, error, type } = user;

  const isFormValid =
    username.trim().length > 0 && idNumber.trim().length > 0;

  const showError = touched && !isFormValid;

  const check = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/api/CheckTablesController`,
        {
          method: "GET",
          headers: {
            "Content-Type":
              "application/json"
          },
        }
      );
      const result =  await response.json();
      if(result===false){
        setTouched("אין אפשרות להתחיל ברישום אם אתה עובד פנה למנהל")
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  check()

  useEffect(() => {
    if (status === 'succeeded') {
      const code = type;
      if (Number(code) === 2 ) {
        navigate("/dataBase");
      }
      else if (Number(code) === 1) {
        navigate("/basis");
      }
    }
  }, [status])

  const handleLogin = async () => {
    setTouched(true);

    if (!isFormValid) return;

    const resultAction = dispatch(
      loginUser({ username, idNumber })
    );


  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
    setIdNumber("");
    navigate("/");
  };

  return (
    <div className="page">
      <div className="loginCard">
        <h1 className="title">מערכת כניסה</h1>

        {/* <p className="subtitle">
          התחבר למערכת עדכון פרטי ההרשמה
        </p> */}
        {!user.type ? (
          <>
            <div className="inputGroup">
              <label>שם משתמש</label>
              <input
                value={username}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                onBlur={() => setTouched(true)}
                className="input"
              />
            </div>

            <div className="inputGroup">
              <label>תעודת זהות</label>
              <input
                value={idNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIdNumber(e.target.value)
                }
                onBlur={() => setTouched(true)}
                className="input"
              />
            </div>

            {showError && (
              <div className="errorText">
                יש למלא את כל השדות לפני ההמשך
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={!isFormValid || status === "loading"}
              className="loginBtn"
            >
              {status === "loading" ? "מתחבר..." : "כניסה למערכת"}
            </button>

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

  );
}