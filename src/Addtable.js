import { addDoc, collection, doc } from "firebase/firestore";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { db } from "./config/firebase";
import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Addtable = (props) => {
  const navigate = useNavigate(); //permette de diriger d'une page a une autre page automatiquement

  const [newTable, setNewTable] = useState({
    Name: "",
    Adress: "",
    City: "",
    Pin: "",
    Country: "",
  });

  const handleChange = (e) => {
    setNewTable({ ...newTable, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { Name, Adress, City, Pin, Country } = newTable;

    try {
      await addDoc(collection(db, "user"), {
        Name,
        Adress,
        City,
        Pin,
        Country,
      });
      navigate("/");
      // window.location.href('/'); méme chose que navigate permette de dirigé dans une autre page (et on le déclare pas contraiement que useNavigate)
      alert("user ajouté");
    } catch (error) {
      console.error("Error adding table:", error);
      alert("error");
    }
  };
  return (
    <div className="NewTables">
      <Container fluid>
        <Row>
          <form onSubmit={handleSubmit}>
            <div className="input">
              <input
                type="text"
                name="Name"
                id="Name"
                value={newTable.Name}
                onChange={handleChange}
                className="form-control"
                placeholder="Prenom et nom"
              />{" "}
              <br />
              <input
                type="text"
                name="Adress"
                id="Adress"
                value={newTable.Adress}
                onChange={handleChange}
                className="form-control"
                placeholder="Adress"
              />{" "}
              <br />
              <input
                type="text"
                name="City"
                id="City"
                value={newTable.City}
                onChange={handleChange}
                className="form-control"
                placeholder="City"
              />{" "}
              <br />
              <input
                type="number"
                name="Pin"
                id="Pin"
                value={newTable.Pin}
                onChange={handleChange}
                className="form-control"
                placeholder="Pin"
              />{" "}
              <br />
              <input
                type="text"
                name="Country"
                id="Country"
                value={newTable.Country}
                onChange={handleChange}
                className="form-control"
                placeholder="Country"
              />{" "}
              <br />
            </div>
            <div className="btn">
            <button className="btn btn-success" type="submit">
              Ajouter
            </button>
            <Link to="/">
              <button className="btn btn-primary">Go Back</button>
            </Link>
            </div>
          </form>
        </Row>
      </Container>
    </div>
  );
};

export default Addtable;

