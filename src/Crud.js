import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db, imageDb } from "./config/firebase";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArchiveFill, EyeFill, PencilFill, TrashFill } from "react-bootstrap-icons";
import { Toast } from "react-bootstrap";
import { getDownloadURL, listAll, ref } from "firebase/storage";

const Crud = () => {
  // const addUser = (newUser) => {
  //   setUsers([newUser, ...users]);
  // };

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [imgUrl, setImgUrl] = useState([]);
  // Nouvelle ligne pour l'état de l'erreur
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  });

  useEffect(() => {
    listAll(ref(imageDb, "files")).then((imgs) => {
      console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  const userCollection = collection(db, "user");

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(userCollection);
      const data = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter(user => !user.archived); // Exclude archived users
      // console.log("donnée :", data);
      setUsers(data);
    } catch (error) {
      // console.error("erreur fetch donnée:", error);
    }
  };

  //Une fonctionnalitée pour l'archivage

  const handleArchiveUser = async (id) => {
    try {
      const userDoc = doc(db, "user", id);
      await updateDoc(userDoc, { archived: true });
      getData();
      Toast.success("Utilisateur archivé avec succès");
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'utilisateur", error);
    }
  };
  

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "user", id));
      getData();
      //Afficher un toast pour indiquer la suppression 
      Toast.success("Utilisateur suprimé avec succés");
    } catch (error) {
      console.error("Error lors de la suppression de l'utilisateur", error);
    }
  };

  const handleUpdateUser = (id) => {
    navigate(`/UpdateUser/${id}`);
  };

  const filteredUsers = users.filter((user) => {
    return (
      (user.Name && user.Name.toLowerCase().includes(search.toLowerCase())) ||
      (user.Adress &&
        user.Adress.toLowerCase().includes(search.toLowerCase())) ||
      (user.City && user.City.toLowerCase().includes(search.toLowerCase())) ||
      (user.Pin &&
        String(user.Pin).toLowerCase().includes(search.toLowerCase())) ||
      (user.Country &&
        user.Country.toLowerCase().includes(search.toLowerCase()))
    );
  });
  // Mise à jour de l'état de l'erreur si aucun utilisateur n'est trouvé
  useEffect(() => {
    if (search && filteredUsers.length === 0) {
      setError("Aucun utilisateur n'est trouvé");
    } else {
      setError("");
    }
  }, [search, filteredUsers]);

  return (
    <div>
      <div className="glob">
      <div className="titre">
  <h3>Customer Détails</h3>
  <button className="btn1">
    <Link to="/Addtable" className="Link">
      ajouter
    </Link>
  </button>
  <button className="btn2">
    <Link to="/Archived" className="Link">
      List of Archived Users
    </Link>
  </button>
  <form style={{ display: "inline", marginLeft: "20%" }}>
    <input
      type="text"
      placeholder="Search..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </form>
</div>

        <table className="tableau-style">
          <thead>
            <tr>
              {/* <th>#</th> */}
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
          {filteredUsers.map((user, index) => (
              <tr key={user.id}>
                <td>
                  {user.imgUrl ? (
                    <img
                      src={user.imgUrl}
                      width="100%"
                      height="25px"
                      alt={`Uploaded ${index}`}
                    />
                  ) : (
                    "No Image"
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
                    className="button-delete"
                  >
                    <PencilFill size={18} color="yellow" className="ms-2" />
                  </button>
                  <Link
                    onClick={() => handleDeleteUser(user.id)}
                    className="button-delete"
                  >
                    <TrashFill size={18} color="red" className="ms-2" />
                  </Link>
                  <Link to="/Archived">
                  <Link to="/Archived"
                    onClick={() => handleArchiveUser(user.id)}
                    className="button-archive"
                  >
                    <ArchiveFill size={18} color="green" className="ms-2"></ArchiveFill>
                  </Link>
                  </Link>
                </td>
              </tr>
            ))}
            {error && (
              <div style={{ color: "red", margin: "20px" }}>{error}</div>
            )}
          </tbody>
        </table>
        <div className="showing">
          <h6>Showing 5 out 25 entries</h6>
          <p className="NUM">" 1 2 3 4 5 "</p>
        </div>
      </div>
    </div>
  );
};

export default Crud;
