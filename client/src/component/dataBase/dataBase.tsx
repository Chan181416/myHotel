import React, { useState } from "react";
import "./DataBase.css";
import { floor } from "firebase/firestore/pipelines";

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
  idNumber: number;
  code: number;
}

interface RoomDB {
  roomNum: number;
  floor: number;
  onSea: boolean;
  extrta: boolean;
  occupied?: string;
}

export default function DataBase() {
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [priceLists, setPriceLists] = useState<PriceList[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rooms, setRooms] = useState<RoomDB[]>([]);

  const [rolesMessage, setRolesMessage] = useState("");
  const [priceMessage, setPriceMessage] = useState("");
  const [conditionMessage, setConditionMessage] = useState("");
  const [roomMessage, setRoomMessage] = useState("");
  const [globalMessage, setGlobalMessage] = useState("");

  /* הוספת שורה */
  const addRow = (setter: any, state: any, newRow: any) => {
    setter([...state, newRow]);
  };

  /* שינוי ערכים */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement> | any,
    index: number,
    state: any,
    setter: any,
    key: string
  ) => {
    const newState = [...state];
    if (e.target?.type === "checkbox") {
      newState[index][key] = e.target.checked;
    } else if (e.target?.type === "number") {
      newState[index][key] = Number(e.target.value);
    } else {
      newState[index][key] = e.target.value;
    }
    setter(newState);
  };

  /* בדיקה אם שדות מלאים */
  const validateRows = (state: any[], tableName: string): boolean => {
    if (state.length === 0) {
      setMessage(tableName, `Cannot save ${tableName} because it is empty.`);
      return false;
    }

    for (let i = 0; i < state.length; i++) {
      const row = state[i];
      for (const key in row) {
        if (row[key] === "" || row[key] === null || row[key] === undefined) {
          setMessage(
            tableName,
            `Cannot save ${tableName}: row ${i + 1} has empty fields.`
          );
          return false;
        }
      }
    }

    return true;
  };

  const setMessage = (
    tableName: string,
    msg: string
  ) => {
    switch (tableName) {
      case "Roles":
        setRolesMessage(msg);
        break;
      case "Price List":
        setPriceMessage(msg);
        break;
      case "Conditions":
        setConditionMessage(msg);
        break;
      case "Rooms":
        setRoomMessage(msg);
        break;
      case "Global":
        setGlobalMessage(msg);
        break;
    }
    setTimeout(() => {
      switch (tableName) {
        case "Roles":
          setRolesMessage("");
          break;
        case "Price List":
          setPriceMessage("");
          break;
        case "Conditions":
          setConditionMessage("");
          break;
        case "Rooms":
          setRoomMessage("");
          break;
        case "Global":
          setGlobalMessage("");
          break;
      }
    }, 3000);
  };

  /* שמירה לשרת עבור Roles */
  const handleSaveRoles = async () => {
    if (!validateRows(roles, "Roles")) return;

    // בדיקה ש-Code > 0
    const invalidCode = roles.some((r) => r.code < 1);
    if (invalidCode) {
      setMessage("Roles", "All Codes must be greater than 0.");
      return;
    }

    try {
      for (const role of roles) {
        const response = await fetch("http://localhost:3000/api/proxy/Role/AddRole", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(role),
        });

        if (!response.ok) {
          const text = await response.text();
          setMessage("Roles", `Error saving role: ${text}`);
          return;
        }
      }

      setMessage("Roles", "Roles saved successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Roles", "Error saving roles: network or server problem.");
    }
  };

  /* שמירת Price List לשרת */
  const handleSavePriceList = async () => {
    if (!validateRows(priceLists, "Price List")) return;
    try {
      for (const price of priceLists) {
        const response = await fetch(
          "http://localhost:3000/api/proxy/PricesList",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(price),
          }
        );

        if (!response.ok) {

          const errorText = await response.text();

          setMessage(
            "Price List",
            `Error saving Price List: ${errorText}`
          );

          return;
        }
      }

      setMessage(
        "Price List",
        "Price List saved successfully!"
      );

    }

    catch (error) {

      console.log(error);

      setMessage(
        "Price List",
        "Server error while saving Price List."
      );
    }
  };

  /* שמירת Conditions לשרת */
  const handleSaveConditions = async () => {

    if (!validateRows(conditions, "Conditions")) return;

    try {

      for (const condition of conditions) {

        const response = await fetch(
          "http://localhost:3000/api/proxy/Condition",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(condition),
          }
        );

        if (!response.ok) {

          const errorText = await response.text();

          setMessage(
            "Conditions",
            `Error saving condition: ${errorText}`
          );

          return;
        }
      }

      setMessage(
        "Conditions",
        "Conditions saved successfully!"
      );

    }

    catch (error) {

      console.log(error);

      setMessage(
        "Conditions",
        "Server error while saving Conditions."
      );
    }
  };

  /* שמירת Rooms לשרת */
  const handleSaveRooms = async () => {

    if (!validateRows(rooms, "Rooms")) return;

    try {

      for (const room of rooms) {

        const response = await fetch(
          "http://localhost:3000/api/proxy/RoomDB",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(room),
          }
        );

        if (!response.ok) {

          const errorText = await response.text();

          setMessage(
            "Rooms",
            `Error saving room: ${errorText}`
          );

          return;
        }
      }

      setMessage(
        "Rooms",
        "Rooms saved successfully!"
      );

    }

    catch (error) {

      console.log(error);

      setMessage(
        "Rooms",
        "Server error while saving Rooms."
      );
    }
  };

  /* שמירה רגילה לכל הטבלאות ללא שליחה לשרת */
  const handleSaveTable = (state: any[], tableName: string) => {
    if (!validateRows(state, tableName)) return;
    console.log(`Saving ${tableName}`, state);
    setMessage(tableName, `${tableName} saved successfully!`);
  };

  /* שמירה עולמית */
  const handleGlobalSave = async () => {
    // בדיקות מקדימות
    if (roles.length === 0) {
      setMessage("Global", "The Roles table is required.");
      return;
    }
    const invalidCode = roles.some((r) => r.code < 1);
    if (invalidCode) {
      setMessage("Global", "All Codes in Roles must be greater than 0.");
      return;
    }

    // שמירה לכל הטבלאות
    // try {
    //   for (const role of roles) {
    //     const res = await fetch("http://localhost:5044/AddRole", {
    //       method: "POST",
    //       headers: { "Content-Type": "application/json" },
    //       body: JSON.stringify(role),
    //     });
    //     if (!res.ok) {
    //       const text = await res.text();
    //       setMessage("Global", `Error saving role: ${text}`);
    //       return;
    //     }
    //   }

    //   console.log("Global save:", { roles, priceLists, conditions, rooms });
    //   setMessage("Global", "All data saved successfully!");
    // } catch (err) {
    //   console.error(err);
    //   setMessage("Global", "Error saving data: network or server problem.");
    // }
  };

  return (
    <div id="welcome">
      {/* Roles */}
      <div className="container fullWidth">
        <h2>Roles</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Id Number</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((row, idx) => (
              <tr key={idx}>
                <td>
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleInputChange(e, idx, roles, setRoles, "name")
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={9}
                    placeholder="9 digits:"
                    value={row.idNumber || ""}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 9) {
                        handleInputChange(
                          {
                            target: {
                              value: value === "" ? "" : Number(value)
                            }
                          },
                          idx,
                          roles,
                          setRoles,
                          "idNumber"
                        );
                      }
                    }}
                  />
                </td>
                <td>
                  <div className="codeToggle">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        className={row.code === num ? "active" : ""}
                        onClick={() =>
                          handleInputChange(
                            { target: { value: num } } as any,
                            idx,
                            roles,
                            setRoles,
                            "code"
                          )
                        }
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() =>
            addRow(setRoles, roles, { name: "", idNumber: 0, code: 1 })
          }
        >
          Add Role
        </button>
        <button onClick={handleSaveRoles}>Save Roles</button>
        {rolesMessage && <p className="saveMessage">{rolesMessage}</p>}
      </div>

      {/* PriceList + Conditions + Rooms */}
      <div className="tablesRow">

        {/* Price List */}
        <div className="container smallTable">

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
                    <input
                      type="text"
                      value={row.event}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          idx,
                          priceLists,
                          setPriceLists,
                          "event"
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="00000"
                      value={row.price || ""}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        handleInputChange(
                          {
                            target: {
                              value: value === "" ? "" : Number(value)
                            }
                          },
                          idx,
                          priceLists,
                          setPriceLists,
                          "price"
                        );
                      }}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() =>
              addRow(setPriceLists, priceLists, {
                event: "",
                price: 0
              })
            }
          >
            Add Price
          </button>

          <button onClick={handleSavePriceList}>
            Save Prices
          </button>

          {priceMessage && (
            <p className="saveMessage">
              {priceMessage}
            </p>
          )}

        </div>

        {/* Conditions */}
        <div className="container smallTable">

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
                    <input
                      type="text"
                      value={row.option}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          idx,
                          conditions,
                          setConditions,
                          "option"
                        )
                      }
                    />
                  </td>

                  <td>
                    <input




                      type="text"
                      inputMode="numeric"
                      placeholder="00000"
                      value={row.price || ""}
                      onChange={(e) => {

                        const value = e.target.value.replace(/\D/g, "");

                        handleInputChange(
                          {
                            target: {
                              value: value === "" ? "" : Number(value)
                            }
                          },
                          idx,
                          conditions,
                          setConditions,
                          "price"
                        );
                      }}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={() =>
              addRow(setConditions, conditions, {
                option: "",
                price: 0
              })
            }
          >
            Add Condition
          </button>

          <button onClick={handleSaveConditions}>
            Save Conditions
          </button>

          {conditionMessage && (
            <p className="saveMessage">
              {conditionMessage}
            </p>
          )}

        </div>

        {/* Rooms */}
        <div className="container smallTable">

          <h2>Rooms</h2>

          <table>

            <thead>
              <tr>
                <th>Room</th>
                <th>Floor</th>
                <th>Sea</th>
                <th>Extra</th>
              </tr>
            </thead>

            <tbody>

              {rooms.map((row, idx) => (

                <tr key={idx}>

                  <td>
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="0000"
                      value={row.roomNum || ""}
                      onChange={(e) => {

                        const value = e.target.value.replace(/\D/g, "");

                        handleInputChange(
                          {
                            target: {
                              value: value === "" ? "" : Number(value)
                            }
                          },
                          idx,
                          rooms,
                          setRooms,
                          "roomNum"
                        );
                      }}
                    />
                   
                  </td>

                  <td>
                    <input
                      type="number"
                      value={row.floor}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          idx,
                          rooms,
                          setRooms,
                          "floor"
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={row.onSea}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          idx,
                          rooms,
                          setRooms,
                          "onSea"
                        )
                      }
                    />
                  </td>

                  <td>
                    <input
                      type="checkbox"
                      checked={row.extrta}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          idx,
                          rooms,
                          setRooms,
                          "extrta"
                        )
                      }
                    />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          <button
            onClick={() =>
              addRow(setRooms, rooms, {
                roomNum: 0,
                floor: 0,
                onSea: false,
                extrta: false
              })
            }
          >
            Add Room
          </button>

          <button onClick={handleSaveRooms}>
            Save Rooms
          </button>

          {roomMessage && (
            <p className="saveMessage">
              {roomMessage}
            </p>
          )}

        </div>

      </div>

      {/* Global Save */}
      <div className="globalSaveContainer">

        <button
          className="globalSaveBtn"
          onClick={handleGlobalSave}
        >
          Save Changes
        </button>

        {globalMessage && (
          <p className="saveMessage">
            {globalMessage}
          </p>
        )}

      </div>

    </div>
  );
}

