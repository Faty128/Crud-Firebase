import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import { db, imageDb } from "./config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Addtable = (props) => {
  const [img, setImg] = useState(null);

  const navigate = useNavigate();

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

    // Vérification des champs vides
    if (!Name || !Adress || !City || !Pin || !Country) {
      toast.error("Veuillez remplir tous les champs", {
        position: "top-center",
      });
      return;
    }

    try {
      let imgUrl = null;

      // Upload image s'il existe et puis get l'URL
      if (img !== null) {
        const imgRef = ref(imageDb, `files/${v4()}`);
        const uploadResult = await uploadBytes(imgRef, img);
        imgUrl = await getDownloadURL(uploadResult.ref);
      }

      // ajout du doc dans firebase
      await addDoc(collection(db, "user"), {
        Name,
        Adress,
        City,
        Pin,
        Country,
        imgUrl,
      });

      toast.success("User ajouté avec succès", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error lors de l'ajout :", error);
      toast.error("Erreur lors de l'ajout de l'utilisateur", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="NewTables">
      <h1 className="p-2">Ajouter des Etudiants</h1>
      <Container fluid>
        <Row>
          <form className="NewTables1" onSubmit={handleSubmit}>
            <div className="input">
              <input type="file" onChange={(e) => setImg(e.target.files[0])} />
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: "auto", textAlign: "center" }}
      />
    </div>
  );
};

export default Addtable;
