import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, logout, checkAllTablesHaveData } from "../../api/userSlice";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [submitted, setSubmitted] = useState(false); // ← שיניתי מ-touched
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showWorkerBlock, setShowWorkerBlock] = useState(false);
  const [allTablesHaveData, setAllTablesHaveData] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.user);
  const { status, error, type } = user;

  const handleAdminContinue = () => {
    setShowAdminModal(false);
    navigate("/dataBase");
  };

  const handleAdminCancel = () => {
    setShowAdminModal(false);
    handleLogout();
  };

  const handleWorkerClose = () => {
    setShowWorkerBlock(false);
    handleLogout();
  };

  const isFormValid =
    username.trim().length > 0 && idNumber.trim().length > 0;

  const isIdValid = /^\d{9}$/.test(idNumber);

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
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitted(true);

    try {
      if (!isFormValid || !isIdValid) return;

      const resultAction = await dispatch(loginUser({ username, idNumber }));

      if (!loginUser.fulfilled.match(resultAction)) return;

      const type = Number(resultAction.payload.code);

      const checkAction = await dispatch(checkAllTablesHaveData());

      if (!checkAllTablesHaveData.fulfilled.match(checkAction)) {
        alert("שגיאה בבדיקת נתוני מערכת");
        return;
      }

      const hasData = checkAction.payload;

      if (type === 1) {
        if (!hasData) {
          setShowWorkerBlock(true);
          return;
        }
        navigate("/basis");
      }

      if (type === 2) {
        if (!hasData) {
          setShowAdminModal(true);
          return;
        }
        navigate("/dataBase");
      }
    } finally {
      setIsSubmitting(false);
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
              {status === "loading" ? (
                <>
                  <span className="spinner"></span>
                  <span>מתחבר...</span>
                </>
              ) : (
                "כניסה למערכת"
              )}
            </button>
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
      {showAdminModal && (
        <div className="modalOverlay">
          <div className="modalBox admin">

            <div className="modalTitle">⚠ אזהרה</div>

            <div className="modalText">
              המערכת אינה מלאה.<br />
              יש להשלים את נתוני הבסיס.<br />
              האם להמשיך בכל זאת?
            </div>

            <div className="modalActions">
              <button className="modalBtn primary" onClick={handleAdminContinue}>
                המשך
              </button>

              <button className="modalBtn danger" onClick={handleAdminCancel}>
                ביטול
              </button>
            </div>

          </div>
        </div>
      )}
      {showWorkerBlock && (
        <div className="modalOverlay">
          <div className="modalBox worker">

            <div className="modalTitle dangerText">
              אין אפשרות להיכנס למערכת
            </div>

            <div className="modalText">
              חסרים נתוני בסיס.<br />
              יש לפנות למנהל המערכת.
            </div>

            <div className="modalActions">
              <button className="modalBtn primary" onClick={handleWorkerClose}>
                אישור
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}