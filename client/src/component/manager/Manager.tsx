//    function Manager() {

//     return (
//         <>
//         <div className="container">

//         <div className="card">
//             <a href="rooms.html">טבלת חדרים</a>
//         </div>

//         <div className="card">
//             <a href="conditions.html">טבלת תנאים</a>
//         </div>

//         <div className="card">
//             <a href="upgrades.html">טבלת שדרוגים</a>
//         </div>

//     </div>

        
         
//         </>

//     )
// }
// export default Manager

   
// ________________________________________
// <!-- rooms.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
//     <meta charset="UTF-8">
//     <title>טבלת חדרים</title>

//     <style>
//         body {
//             font-family: Arial;
//             padding: 40px;
//             background: #f7f7f7;
//         }

//         table {
//             width: 100%;
//             border-collapse: collapse;
//             background: white;
//         }

//         th, td {
//             border: 1px solid #ccc;
//             padding: 12px;
//             text-align: center;
//         }

//         th {
//             background: #0077cc;
//             color: white;
//         }
//     </style>
// </head>
// <body>

//     <h1>טבלת חדרים</h1>

//     <table>
//         <tr>
//             <th>מספר חדר</th>
//             <th>מספר מיטות</th>
//             <th>קומה</th>
//             <th>סוג חדר</th>
//         </tr>

//         <tr>
//             <td>101</td>
//             <td>2</td>
//             <td>1</td>
//             <td>זוגי</td>
//         </tr>

//         <tr>
//             <td>202</td>
//             <td>4</td>
//             <td>2</td>
//             <td>משפחתי</td>
//         </tr>
//     </table>

// </body>
// </html>
// ________________________________________
// <!-- conditions.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
//     <meta charset="UTF-8">
//     <title>טבלת תנאים</title>

//     <style>
//         body {
//             font-family: Arial;
//             padding: 40px;
//             background: #f7f7f7;
//         }

//         table {
//             width: 100%;
//             border-collapse: collapse;
//             background: white;
//         }

//         th, td {
//             border: 1px solid #ccc;
//             padding: 12px;
//             text-align: center;
//         }

//         th {
//             background: #28a745;
//             color: white;
//         }
//     </style>
// </head>
// <body>

//     <h1>טבלת תנאים</h1>

//     <table>
//         <tr>
//             <th>קוד תנאי</th>
//             <th>תיאור</th>
//         </tr>

//         <tr>
//             <td>1</td>
//             <td>ללא עישון</td>
//         </tr>

//         <tr>
//             <td>2</td>
//             <td>ללא בעלי חיים</td>
//         </tr>
//     </table>

// </body>
// </html>
// ________________________________________
// <!-- upgrades.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
//     <meta charset="UTF-8">
//     <title>טבלת שדרוגים</title>

//     <style>
//         body {
//             font-family: Arial;
//             padding: 40px;
//             background: #f7f7f7;
//         }

//         table {
//             width: 100%;
//             border-collapse: collapse;
//             background: white;
//         }

//         th, td {
//             border: 1px solid #ccc;
//             padding: 12px;
//             text-align: center;
//         }

//         th {
//             background: #ff9800;
//             color: white;
//         }
//     </style>
// </head>
// <body>

//     <h1>טבלת שדרוגים</h1>

//     <table>
//         <tr>
//             <th>שם שדרוג</th>
//             <th>תוספת מחיר</th>
//         </tr>

//         <tr>
//             <td>מול הים</td>
//             <td>250₪</td>
//         </tr>

//         <tr>
//             <td>אקסטרה מיטה</td>
//             <td>150₪</td>
//         </tr>
//     </table>

// </body>
// </html>
// <!-- index.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>מערכת ניהול מלון</title>

// <style>
//     *{
//         margin:0;
//         padding:0;
//         box-sizing:border-box;
//         font-family:Arial;
//     }

//     body{
//         background:#f1f5f9;
//         min-height:100vh;
//         display:flex;
//         justify-content:center;
//         align-items:center;
//     }

//     .container{
//         width:90%;
//         max-width:1200px;
//     }

//     .title{
//         text-align:center;
//         margin-bottom:40px;
//         font-size:42px;
//         color:#1e293b;
//     }

//     .cards{
//         display:grid;
//         grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
//         gap:25px;
//     }

//     .card{
//         background:white;
//         padding:40px;
//         border-radius:20px;
//         text-align:center;
//         text-decoration:none;
//         color:#111827;
//         box-shadow:0 10px 25px rgba(0,0,0,0.08);
//         transition:0.3s;
//     }

//     .card:hover{
//         transform:translateY(-8px);
//         box-shadow:0 15px 35px rgba(0,0,0,0.15);
//     }

//     .icon{
//         font-size:55px;
//         margin-bottom:20px;
//     }

//     .card h2{
//         margin-bottom:10px;
//         font-size:28px;
//     }

//     .card p{
//         color:#64748b;
//         font-size:16px;
//     }
// </style>
// </head>

// <body>

// <div className="container">

//     <h1 className="title">מערכת ניהול</h1>

//     <div className="cards">

//         <a className="card" href="rooms.html">
//             <div className="icon">🛏️</div>
//             <h2>טבלת חדרים</h2>
//             <p>ניהול חדרים ומיטות</p>
//         </a>

//         <a className="card" href="conditions.html">
//             <div className="icon">📋</div>
//             <h2>טבלת תנאים</h2>
//             <p>ניהול תנאי הזמנה</p>
//         </a>

//         <a className="card" href="upgrades.html">
//             <div className="icon">⭐</div>
//             <h2>טבלת שדרוגים</h2>
//             <p>ניהול תוספות ושדרוגים</p>
//         </a>

//     </div>

// </div>

// </body>
// </html>
// ________________________________________
// <!-- rooms.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>טבלת חדרים</title>

// <style>
//     body{
//         background:#f8fafc;
//         font-family:Arial;
//         padding:40px;
//     }

//     h1{
//         text-align:center;
//         margin-bottom:30px;
//         color:#0f172a;
//     }

//     table{
//         width:100%;
//         border-collapse:collapse;
//         background:white;
//         border-radius:15px;
//         overflow:hidden;
//         box-shadow:0 10px 25px rgba(0,0,0,0.08);
//     }

//     th{
//         background:#2563eb;
//         color:white;
//         padding:18px;
//     }

//     td{
//         padding:16px;
//         text-align:center;
//         border-bottom:1px solid #e2e8f0;
//     }

//     tr:hover{
//         background:#f1f5f9;
//     }

//     .btn{
//         display:inline-block;
//         margin-top:25px;
//         background:#2563eb;
//         color:white;
//         padding:12px 20px;
//         text-decoration:none;
//         border-radius:10px;
//     }
// </style>
// </head>

// <body>

// <h1>טבלת חדרים</h1>

// <table>
//     <tr>
//         <th>מספר חדר</th>
//         <th>מספר מיטות</th>
//         <th>קומה</th>
//         <th>סוג חדר</th>
//     </tr>

//     <tr>
//         <td>101</td>
//         <td>2</td>
//         <td>1</td>
//         <td>זוגי</td>
//     </tr>

//     <tr>
//         <td>202</td>
//         <td>4</td>
//         <td>2</td>
//         <td>משפחתי</td>
//     </tr>

//     <tr>
//         <td>305</td>
//         <td>1</td>
//         <td>3</td>
//         <td>יחיד</td>
//     </tr>
// </table>

// <a className="btn" href="index.html">חזרה לדף הראשי</a>

// </body>
// </html>
// ________________________________________
// <!-- conditions.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>טבלת תנאים</title>

// <style>
//     body{
//         background:#f8fafc;
//         font-family:Arial;
//         padding:40px;
//     }

//     h1{
//         text-align:center;
//         margin-bottom:30px;
//         color:#0f172a;
//     }

//     table{
//         width:100%;
//         border-collapse:collapse;
//         background:white;
//         border-radius:15px;
//         overflow:hidden;
//         box-shadow:0 10px 25px rgba(0,0,0,0.08);
//     }

//     th{
//         background:#16a34a;
//         color:white;
//         padding:18px;
//     }

//     td{
//         padding:16px;
//         text-align:center;
//         border-bottom:1px solid #e2e8f0;
//     }

//     tr:hover{
//         background:#f1f5f9;
//     }

//     .btn{
//         display:inline-block;
//         margin-top:25px;
//         background:#16a34a;
//         color:white;
//         padding:12px 20px;
//         text-decoration:none;
//         border-radius:10px;
//     }
// </style>
// </head>

// <body>

// <h1>טבלת תנאים</h1>

// <table>
//     <tr>
//         <th>קוד</th>
//         <th>תנאי</th>
//     </tr>

//     <tr>
//         <td>1</td>
//         <td>ללא עישון</td>
//     </tr>

//     <tr>
//         <td>2</td>
//         <td>ללא בעלי חיים</td>
//     </tr>

//     <tr>
//         <td>3</td>
//         <td>צ׳ק אין אחרי 14:00</td>
//     </tr>
// </table>

// <a className="btn" href="index.html">חזרה לדף הראשי</a>

// </body>
// </html>
// ________________________________________
// <!-- upgrades.html -->
// <!DOCTYPE html>
// <html lang="he" dir="rtl">
// <head>
// <meta charset="UTF-8">
// <meta name="viewport" content="width=device-width, initial-scale=1.0">
// <title>טבלת שדרוגים</title>

// <style>
//     body{
//         background:#f8fafc;
//         font-family:Arial;
//         padding:40px;
//     }

//     h1{
//         text-align:center;
//         margin-bottom:30px;
//         color:#0f172a;
//     }

//     table{
//         width:100%;
//         border-collapse:collapse;
//         background:white;
//         border-radius:15px;
//         overflow:hidden;
//         box-shadow:0 10px 25px rgba(0,0,0,0.08);
//     }

//     th{
//         background:#ea580c;
//         color:white;
//         padding:18px;
//     }

//     td{
//         padding:16px;
//         text-align:center;
//         border-bottom:1px solid #e2e8f0;
//     }

//     tr:hover{
//         background:#f1f5f9;
//     }

//     .btn{
//         display:inline-block;
//         margin-top:25px;
//         background:#ea580c;
//         color:white;
//         padding:12px 20px;
//         text-decoration:none;
//         border-radius:10px;
//     }
// </style>
// </head>

// <body>

// <h1>טבלת שדרוגים</h1>

// <table>
//     <tr>
//         <th>שדרוג</th>
//         <th>מחיר</th>
//     </tr>

//     <tr>
//         <td>מול הים</td>
//         <td>250₪</td>
//     </tr>

//     <tr>
//         <td>אקסטרה מיטה</td>
//         <td>150₪</td>
//     </tr>

//     <tr>
//         <td>ארוחת VIP</td>
//         <td>300₪</td>
//     </tr>
// </table>

// <a className="btn" href="index.html">חזרה לדף הראשי</a>

// </body>
// </html>

