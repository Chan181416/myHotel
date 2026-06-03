import React, { useState } from "react";
import "./DataBase.css";

interface Condition {
  option: string;
  price: number;
}

interface PriceList {
  price: number;
  event: string;
}

interface Role {
  name: string;
  idNumber:number;
  code: number;
}

interface RoomDB {
  roomNum: number;
  floor: number;
  onSea: boolean;
  extrta: boolean;
}

export default function DataBase() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rooms, setRooms] = useState<RoomDB[]>([]);

  const addRow = (setter: any, state: any, newRow: any) => {
    setter([...state, newRow]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number, state: any, setter: any, key: string) => {
    const newState = [...state];
    if (e.target.type === "checkbox") {
      newState[index][key] = e.target.checked;
    } else if (e.target.type === "number") {
      newState[index][key] = Number(e.target.value);
    } else {
      newState[index][key] = e.target.value;
    }
    setter(newState);
  };

  return (
    <div id="welcome">
      <div className="container">
        <h2>Roles</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>IdNumber</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input type="text" value={row.name} onChange={e => handleInputChange(e, idx, roles, setRoles, "name")} />
                </td>
                <td>
                  <input type="number" value={row.idNumber} onChange={e => handleInputChange(e, idx, roles, setRoles, "num")} />
                </td>
                <td>
                  <input type="number" value={row.code} onChange={e => handleInputChange(e, idx, roles, setRoles, "num")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addRow(setRoles, roles, { name: "", num: 0 })}>Add Role</button>
      </div>

      <div className="container">
        <h2>Conditions</h2>
        <table>
          <thead>
            <tr>
              <th>Option</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {conditions.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input type="text" value={row.option} onChange={e => handleInputChange(e, idx, conditions, setConditions, "option")} />
                </td>
                <td>
                  <input type="number" value={row.price} onChange={e => handleInputChange(e, idx, conditions, setConditions, "price")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addRow(setConditions, conditions, { option: "", price: 0 })}>Add Condition</button>
      </div>

      <div className="container">
        <h2>Price List</h2>
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {priceLists.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input type="text" value={row.event} onChange={e => handleInputChange(e, idx, priceLists, setPriceLists, "event")} />
                </td>
                <td>
                  <input type="number" value={row.price} onChange={e => handleInputChange(e, idx, priceLists, setPriceLists, "price")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addRow(setPriceLists, priceLists, { event: "", price: 0 })}>Add Price</button>
      </div>


      <div className="container">
        <h2>Rooms</h2>
        <table>
          <thead>
            <tr>
              <th>Room Num</th>
              <th>Floor</th>
              <th>On Sea</th>
              <th>Extra</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((row, idx) => (
              <tr key={idx}>
                <td><input type="number" value={row.roomNum} onChange={e => handleInputChange(e, idx, rooms, setRooms, "roomNum")} /></td>
                <td><input type="number" value={row.floor} onChange={e => handleInputChange(e, idx, rooms, setRooms, "floor")} /></td>
                <td><input type="checkbox" checked={row.onSea} onChange={e => handleInputChange(e, idx, rooms, setRooms, "onSea")} /></td>
                <td><input type="checkbox" checked={row.extrta} onChange={e => handleInputChange(e, idx, rooms, setRooms, "extrta")} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => addRow(setRooms, rooms, { roomNum: 0, floor: 0, onSea: false, extrta: false, occupied: "" })}>Add Room</button>
      </div>
    </div>
  );
}