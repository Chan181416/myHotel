<<<<<<< HEAD


import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout } from "../features/user/userSlice";
import "./login.css";

export default function LoginSystem() {
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // משתמש מה-Redux state
  const user = useSelector((state) => state.user);

  const handleLogin = async () => {
=======
import React, { useEffect, useState } from "react";
import "./login.css"
export default function LoginSystem() {

  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = () => {

>>>>>>> 1ad182d541b4d4e9cc4c273ee443ef7b3655b563
    if (!username || !idNumber) {
      alert("יש למלא את כל השדות");
      return;
    }

<<<<<<< HEAD
    // קריאה ל-Redux action
    const resultAction = await dispatch(
      loginUser({ username, idNumber }) // או אם זה סינכרוני פשוט { username, idNumber, type }
    );

    // אם הצליח
    if (loginUser.fulfilled.match(resultAction)) {
      alert("התחברת בהצלחה!");
      const type = resultAction.payload.type;

      // ניווט לפי type
      if (type === 1) {
        navigate("/basis");
      } else if (type === 2) {
        navigate("/allComponents");
      }
    } else {
      alert("שגיאה בהתחברות: " + resultAction.payload || resultAction.error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUsername("");
    setIdNumber("");
  };

  return (
    <div className="page">
      <div>
        <h1 className="title">מערכת כניסה</h1>

        {!user.type ? (
          <>
            <div className="inputGroup">
              <label className="label">שם משתמש</label>
=======
    const userData = {
      username,
      idNumber
    };

    localStorage.setItem("user", JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setUsername("");
    setIdNumber("");
  };
   return (
    <div className="page">

      <div className="container">

        <h1 className="title">
          מערכת כניסה
        </h1>

        {!user ? (
          <>
            <div className="inputGroup">
              <label className="label">שם משתמש</label>

>>>>>>> 1ad182d541b4d4e9cc4c273ee443ef7b3655b563
              <input
                type="text"
                placeholder="הכנס שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
<<<<<<< HEAD
                className="input"
=======
                className = "input"
>>>>>>> 1ad182d541b4d4e9cc4c273ee443ef7b3655b563
              />
            </div>

            <div className="inputGroup">
              <label className="label">תעודת זהות</label>
<<<<<<< HEAD
=======

>>>>>>> 1ad182d541b4d4e9cc4c273ee443ef7b3655b563
              <input
                type="text"
                placeholder="הכנס תעודת זהות"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="input"
              />
            </div>

<<<<<<< HEAD
            <button onClick={handleLogin} className="loginBtn">
=======
            <button onClick={login} className="loginBtn">
>>>>>>> 1ad182d541b4d4e9cc4c273ee443ef7b3655b563
              כניסה למערכת
            </button>
          </>
        ) : (
          <div className="userBox">
<<<<<<< HEAD
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


=======

            <h3 style={{ marginBottom: "15px" }}>
              משתמש מחובר
            </h3>

            <p>
              <strong>שם משתמש:</strong> {user.username}
            </p>

            <p>
              <strong>תעודת זהות:</strong> {user.idNumber}
            </p>

            <button onClick={logout} className="logoutBtn">
              התנתקות
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
>>>>>>> 1ad182d541b4d4e9cc4c273ee443ef7b3655b563
