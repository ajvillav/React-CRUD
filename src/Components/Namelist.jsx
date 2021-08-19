import { blue, red } from "@material-ui/core/colors";
import React, { useState } from "react";
import uniqid from "uniqid";
import Styles from "./Styles.css";

const Namelist = () => {
  const [name, setName] = useState("");
  const [nameList, setNameList] = useState([]);
  const [editState, setEditState] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState("null");

  const addName = (event) => {
    event.preventDefault();

    if (!name.trim()) {
      setError("Name field is empty");
      return;
    }

    const secureName = {
      id: uniqid(),
      secName: name,
    };

    setNameList([...nameList, secureName]);
    setName("");
    setError(null);
  };

  const deleteName = (id) => {
    const newArray = nameList.filter((item) => item.id !== id);
    setNameList(newArray);
  };

  const edit = (item) => {
    setEditState(true);
    setName(item.secName);
    setId(item.id);
  };

  const editName = (event) => {
    event.preventDefault();
    const newArray = nameList.map((item) =>
      item.id === id ? { id: item.id, secName: name } : item
    );
    setNameList(newArray);
    setEditState(false);
    setName("");
  };

  return (
    <div>
      <h2 className="mb-4">CRUD basic application</h2>
      <div className="row">
        <div className="col">
          <h2>Name list</h2>
          <ul className="list-group">
            {nameList.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.secName}
                <button
                  className="btn btn-danger button-right-red"
                  onClick={() => {
                    deleteName(item.id);
                  }}
                >
                  DELETE
                </button>
                <button
                  className="btn btn-info button-right-blue"
                  onClick={() => {
                    edit(item);
                  }}
                >
                  EDIT
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col">
          <h2>Form to add names</h2>
          <form
            onSubmit={editState ? editName : addName}
            className="form-group"
          >
            <input
              className="form-control mb-3"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Introduce the name"
              value={name}
            />
            <input
              className="btn btn-info mb-3"
              type="submit"
              value={editState ? "Edit name" : "RegisterName"}
            />
          </form>
          {error != null ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Namelist;
