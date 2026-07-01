import { useEffect, useState, useMemo } from "react";

export interface RoomLocationViewDTO {
  id: string;
  name: string;
  phone: string;
  roomNum: number;
  floor: number;
  roomCondition: string;
}

export default function RoomLocationsTable() {
  const [data, setData] = useState<RoomLocationViewDTO[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/room-location/view")
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
            <th>Name</th>
            <th>Phone</th>
            <th>Room</th>
            <th>Floor</th>
            <th>Status</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}