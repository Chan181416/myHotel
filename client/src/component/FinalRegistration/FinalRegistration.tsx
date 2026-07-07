import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../STYLES/Style.css";

export interface RoomLocationViewDTO {
    id: string;
    name: string;
    phone: string;
    roomNum: number;
    floor: number;
    roomCondition: string;
    event: string;
}

export default function RoomLocationsTable() {
    const [data, setData] = useState<RoomLocationViewDTO[]>([]);
    const [search, setSearch] = useState("");
    const baseUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);

    useEffect(() => {
        fetch(`${baseUrl}/api/room-location/view`)
            .then((res) => res.json())
            .then(setData);
    }, []);

    // 🔍 סינון חי
    const filteredData = useMemo(() => {
        const q = search.toLowerCase();

        return data.filter((item) => {
            return (
                item.name?.toLowerCase().includes(q) ||
                String(item.roomNum).includes(q)
            );
        });
    }, [data, search]);

    return (
        <div>
            {/* 🔎 שדה חיפוש */}
            <input
                type="text"
                placeholder="חיפוש לפי שם או מספר חדר..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    marginBottom: "10px",
                    padding: "6px",
                    width: "250px",
                }}
            />

            {/* 📊 טבלה */}
            <table border={1} cellPadding={8}>
                <thead>
                    <tr>
                        <th>שם</th>
                        <th>תעודת זהות</th>
                        <th>מספר חדר</th>
                        <th>קומה</th>
                        <th>שדרוג</th>
                        <th>מסלול</th>

                    </tr>
                </thead>

                <tbody>
                    {filteredData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.roomNum}</td>
                            <td>{item.floor}</td>
                            <td>{item.roomCondition}</td>
                            <td>{item.event}</td>

                        </tr>
                    ))}
                </tbody>
            </table>

            {user.type === 2 && (
                <button
                    type="button"
                    className="adminHomeBtn"
                    onClick={() => navigate("/admin")}
                >
                    <span className="icon">🏠</span>
                    <span className="text">לוח הבקרה</span>
                </button>
            )}
            
        </div>
    );
}


