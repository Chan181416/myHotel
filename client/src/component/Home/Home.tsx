
import "./Home.css"
import { Link } from 'react-router-dom';



function Home() {

    return (
        <>
            <div className="note">
                <div className="hello">
                    <h1>ברוכה הבאה לנופשי נשים של תמי זייברט</h1>
                </div>
                <Link to="/">Go to Login Page</Link>
            </div>


        </>

    )
}
export default Home
