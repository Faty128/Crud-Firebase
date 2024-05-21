import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import { db } from "./config/firebase";

const UpdateUser = () => {
  const { id } = useParams(); // Récupère l'identifiant de l'URL
  const history = useNavigate(); // Utilisé pour rediriger après la mise à jour

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, "user", id)); // Récupère les détails de l'utilisateur depuis Firestore
        if (userDoc.exists()) {
          setUser({ id: userDoc.id, ...userDoc.data() }); // Définit l'utilisateur dans l'état local
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]); // Assurez-vous que cette fonction est exécutée à chaque changement de l'identifiant

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "user", id), user); // Met à jour les détails de l'utilisateur dans Firestore
      console.log("User updated successfully");
      history("/"); // Redirige vers la page d'accueil après la mise à jour
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Affiche une indication de chargement pendant le chargement des données de l'utilisateur
  }

  // Utilisez les détails de l'utilisateur pour pré-remplir le formulaire de mise à jour
  return (
    <div className="NewTables mb-4">
      <h1 className="text-center">Update User</h1>
      <div className="login-box mt-4">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              value={user.Name}
              onChange={(e) => setUser({ ...user, Name: e.target.value })}
            />
            <label>Name :</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={user.Adress}
              onChange={(e) => setUser({ ...user, Adress: e.target.value })}
            />
            <label>Adress:</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={user.City}
              onChange={(e) => setUser({ ...user, City: e.target.value })}
            />
            <label>City-cité:</label>
          </div>
          <div className="user-box">
            <input
              type="number"
              value={user.Pin}
              onChange={(e) => setUser({ ...user, Pin: e.target.value })}
            />
            <label>Pin-Code:</label>
          </div>
          <div className="user-box">
            <input
              type="text"
              value={user.Country}
              onChange={(e) => setUser({ ...user, Country: e.target.value })}
            />
            <label>Country:</label>
          </div>
          <center>
            <button type="submit" className="update">
              Update
              <span></span>
            </button>
            <button className="text-black">
              GO Back
              <span></span>
            </button>
          </center>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
