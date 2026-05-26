


import "./About.css"
import { Link } from 'react-router-dom';



function About() {

    return (
        <>
            <div id="basisForm">
                <h1> ברוכה הבאה לנופשי נשים של תמי זייברט </h1>
                <h2 className="info">הנופש הבא יתקיים בתאריכים ה ו תמוז במלון גלי תמר באשקלון</h2>
                <h3 className="info">מחכות לך,  לקחת נשימה ולאסוף כח יחד </h3>   
                <Link to="/">-Go to Basis Page-</Link>
            </div>


        </>

    )
}



export default About;