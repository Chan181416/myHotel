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

    if (!username || !idNumber) {
      alert("יש למלא את כל השדות");
      return;
    }

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

              <input
                type="text"
                placeholder="הכנס שם משתמש"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className = "input"
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

            <button onClick={login} className="loginBtn">
              כניסה למערכת
            </button>
          </>
        ) : (
          <div className="userBox">

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