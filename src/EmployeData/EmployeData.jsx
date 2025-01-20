import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeData = () => {
  const [EmployeData, setEmployeData] = useState([]);
  const [updateid, setupdateid] = useState();
  const [Edit, setEdit] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  const fectData = async () => {
    const { data } = await axios.get("http://localhost:5000/employees");
    setEmployeData(data);
  };

  useEffect(() => {
    fectData();
  }, []);

  async function handleSubmite() {
    const data = await axios.post(`http://localhost:5000/employees`, formData);
    if (data) {
      alert("Succesfully added");
      setformData({
        firstName: "",
        lastName: "",
        age: "",
      });
      fectData();
    }
  }

  async function handleedit(id) {
    setEdit(true);
    const { data } = await axios.get(`http://localhost:5000/employees/${id}`);

    setformData({
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
    });

    setupdateid(id);
  }

  async function handleupdate() {
    const { data } = await axios.put(
      `http://localhost:5000/employees/${updateid}`,
      formData
    );
    setformData({
      firstName: "",
      lastName: "",
      age: "",
    });
    setEdit(false);
    fectData();
  }

  async function deltee(id) {
    const { data } = await axios.delete(`http://localhost:5000/employees/${id}`);
    console.log(data);
    fectData();
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f4f7fa",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Employee Form</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <label style={{ fontWeight: "bold" }}>First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              value={formData.firstName}
              onChange={(e) =>
                setformData({ ...formData, firstName: e.target.value })
              }
              style={{
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "200px",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setformData({ ...formData, lastName: e.target.value })
              }
              style={{
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "200px",
                outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ fontWeight: "bold" }}>Age</label>
            <input
              type="text"
              placeholder="Enter Age"
              value={formData.age}
              onChange={(e) =>
                setformData({
                  ...formData,
                  age: Number(e.target.value) ? Number(e.target.value) : "",
                })
              }
              style={{
                padding: "10px",
                marginTop: "5px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                width: "100px",
                outline: "none",
              }}
            />
          </div>
          <div>
            {Edit ? (
              <button
                onClick={handleupdate}
                style={{
                  backgroundColor: "#007bff",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Update
              </button>
            ) : (
              <button
                onClick={handleSubmite}
                style={{
                  backgroundColor: "#28a745",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            backgroundColor: "#ffffff",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f8f9fa", color: "#333" }}>
              <th style={{ padding: "15px", borderBottom: "2px solid #e9ecef" }}>
                Sr.No
              </th>
              <th style={{ padding: "15px", borderBottom: "2px solid #e9ecef" }}>
                First Name
              </th>
              <th style={{ padding: "15px", borderBottom: "2px solid #e9ecef" }}>
                Last Name
              </th>
              <th style={{ padding: "15px", borderBottom: "2px solid #e9ecef" }}>
                Age
              </th>
              <th style={{ padding: "15px", borderBottom: "2px solid #e9ecef" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {EmployeData?.map((item, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: "1px solid #e9ecef",
                  backgroundColor: index % 2 === 0 ? "#f8f9fa" : "white",
                }}
              >
                <td style={{ padding: "15px" }}>{index + 1}</td>
                <td style={{ padding: "15px" }}>{item.firstName}</td>
                <td style={{ padding: "15px" }}>{item.lastName}</td>
                <td style={{ padding: "15px" }}>{item.age}</td>
                <td style={{ padding: "15px", textAlign: "center" }}>
                  <button
                    onClick={() => handleedit(item.id)}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deltee(item.id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "6px 12px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeData;
