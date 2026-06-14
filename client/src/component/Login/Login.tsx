// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { loginUser, logout } from "../../api/userSlice";
// import "./login.css";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [idNumber, setIdNumber] = useState("");
//   const [errorMessage, setErrorMessage] = useState('')

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // לפי הסלייס החדש
//   const user = useSelector((state) => state?.user);
//   const { status, error } = user;

//   const handleLogin = async () => {
//     if (!username.trim() || !idNumber.trim()) {
//       alert("יש למלא את כל השדות");
//       return;
//     }

//     try {
//       const resultAction = await dispatch(
//         loginUser({ username, idNumber })
//       );

//       // אם הצליח
//       if (loginUser.fulfilled.match(resultAction)) {
//         // alert("התחברת בהצלחה!");
//         //  console.log("SUCCESS");
//         setErrorMessage('')
//         const type = resultAction.payload.code;

//         // ניווט לפי סוג משתמש
//         if (Number(type) === 1) {
//           navigate("/basis");
//         } else if (Number(type) === 2) {
//           navigate("/home");
//         }
//       } else {

//         setErrorMessage(
//           "שגיאה בהתחברות: " +
//           (resultAction.payload || resultAction.error.message)
//         );
//       }
//     } catch (err) {
//       setErrorMessage("שגיאה כללית בהתחברות");
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout());
//     setUsername("");
//     setIdNumber("");
//     navigate("/");
//   };

//   return (
//     <div className="page">
//       <div>
//         <h1 className="title">מערכת כניסה</h1>

//         {!user.type ? (
//           <>
//             <div className="inputGroup">
//               <label className="label">שם משתמש</label>
//               <input
//                 type="text"
//                 placeholder="הכנס שם משתמש"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="input"
//               />
//             </div>

//             <div className="inputGroup">
//               <label className="label">תעודת זהות</label>
//               <input
//                 type="text"
//                 placeholder="הכנס תעודת זהות"
//                 value={idNumber}
//                 onChange={(e) => setIdNumber(e.target.value)}
//                 className="input"
//               />
//             </div>

//             <button
//               onClick={handleLogin}
//               className="loginBtn"
//               disabled={status === "loading"}
//             >
//               {status === "loading"
//                 ? "מתחבר..."
//                 : "כניסה למערכת"}
//             </button>

//             {error && (
//               <p className="errorText">{error}</p>
//             )}
//           </>
//         ) : (
//           <div className="userBox">
//             <h3 style={{ marginBottom: "15px" }}>
//               משתמש מחובר
//             </h3>

//             <p>
//               <strong>שם משתמש:</strong>{" "}
//               {user.username}
//             </p>

//             <p>
//               <strong>תעודת זהות:</strong>{" "}
//               {user.idNumber}
//             </p>

//             <p>
//               <strong>סוג משתמש:</strong>{" "}
//               {user.type}
//             </p>

//             <button
//               onClick={handleLogout}
//               className="logoutBtn"
//             >
//               התנתקות
//             </button>
//           </div>
//         )}
//       </div>
//       <div>{errorMessage }</div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout } from "../../api/userSlice";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [touched, setTouched] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const { status, error } = user;

  const isFormValid =
    username.trim().length > 0 && idNumber.trim().length > 0;

  const showError = touched && !isFormValid;

  const handleLogin = async () => {
    setTouched(true);

    if (!isFormValid) return;

    const resultAction = await dispatch(
      loginUser({ username, idNumber })
    );

    if (loginUser.fulfilled.match(resultAction)) {
      const type = resultAction.payload.code;


      if (!type) {
        {
          showError && (
            <div className="errorText">
              אתה עוד לא רשום פנה למנהל
            </div>
          )
        }
      }
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

  return (
    <div className="page">
      <h1 className="title">מערכת כניסה</h1>

      {!user.type ? (
        <>
          <div className="inputGroup">
            <label>שם משתמש</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched(true)}
              className="input"
            />
          </div>

          <div className="inputGroup">
            <label>תעודת זהות</label>
            <input
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
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
  );
}