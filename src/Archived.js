import React, { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { Link, useNavigate } from "react-router-dom";
import { EyeFill, PencilFill, StarFill, TrashFill } from "react-bootstrap-icons";
import { Toast } from "react-bootstrap";

const ArchivedUsers = () => {
  const [archivedUsers, setArchivedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    getData();
  });
  
  useEffect(() => {
    getArchivedUsers();
  }, []);

  const handleUpdateUser = (id) => {
    navigate(`/UpdateUser/${id}`);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "user", id));
      getData();
      Toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  const handleUnarchiveUser = async (id) => {
    try {
      const userDoc = doc(db, "user", id);
      await updateDoc(userDoc, { archived: false });
      getArchivedUsers();
      //Afficher un toast pour indiquer la suppression 
      Toast.success("Utilisateur désarchivé avec succès");
    } catch (error) {
      console.error("Erreur lors du désarchivage de l'utilisateur", error);
    }
  };

  const userCollection = collection(db, "user");

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(userCollection);
      const data = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(user => !user.archived);
    //   console.log("donnée :", data);
      setUsers(data);
    } catch (error) {
      console.error("Erreur fetch donnée:", error);
    }
  };

  const getArchivedUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "user"));
      const data = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(user => user.archived);
      setArchivedUsers(data);
    } catch (error) {
      console.error("Erreur fetch archived users:", error);
    }
  };

  return (
    <div>
      <h3 className="text-center mt-4 text-uppercase">Archived Users</h3>
      
      <table className="tableau-style">
        
        <thead>
            
          <tr>
            
            <th>Image</th>
            <th>Name</th>
            <th>Adress</th>
            <th>City</th>
            <th>Pin Code</th>
            <th>Country</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
         {archivedUsers.length === 0 ? (
        <div className="div-archive">
          <p>Aucun utilisateur n'est archivé</p>
        </div>
      ) : (
        ""
    )}
          {archivedUsers.map(user => (
            <tr key={user.id}>
                 <td>
                  {user.imgUrl ? (
                    <img
                      src={user.imgUrl}
                      height="25px"
                      width="100%"
                      alt={`Uploaded ${indexedDB}`}
                    />
                  ) : (
                    ""
                  )}
                </td>
              <td>{user.Name}</td>
              <td>{user.Adress}</td>
              <td>{user.City}</td>
              <td>{user.Pin}</td>
              <td>{user.Country}</td>
              <td className="icons">
                <Link to={`/voir/${user.id}`}>
                  <EyeFill size={18} color="skyblue" className="ms-2" />
                </Link>
                <button
                    onClick={() => handleUpdateUser(user.id)}
                    className="button-edit"
                  >
                    <PencilFill size={18} color="yellow" className="ms-2" />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="button-delete"
                  >
                    <TrashFill size={18} color="red" className="ms-2" />
                  </button>
                  <Link to="/"
                    onClick={() => handleUnarchiveUser(user.id)}
                    className="button-unarchive"
                  >
                    <StarFill size={18}  color="blue" className="ms-2" aria-hidden="true"></StarFill>
                  </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        type="button"
        className="btn-archive"
        onClick={() => navigate(-1)}
      >
        GO Back
        <span></span>
      </button>
    </div>
  );
};

export default ArchivedUsers;
