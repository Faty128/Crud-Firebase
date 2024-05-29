import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, imageDb } from "./config/firebase"; // Assurez-vous d'importer Firebase Storage

const UpdateUser = () => {
  // Récupère l'identifiant de l'URL
  const { id } = useParams();
  // Utilisé pour rediriger après la mise à jour
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [img, setImg] = useState(null);
  // Ajout de l'état pour l'aperçu de l'image
  const [preview, setPreview] = useState(null);

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
        // console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]); // Assurez-vous que cette fonction est exécutée à chaque changement de l'identifiant

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedUser = { ...user };

      if (img) {
        // Upload the image to Firebase Storage
        const imageRef = ref(imageDb, `images/${img.name}`);
        const snapshot = await uploadBytes(imageRef, img);
        const url = await getDownloadURL(snapshot.ref);
        updatedUser.imgUrl = url; // Update the user object with the new image URL
      }

      await updateDoc(doc(db, "user", id), updatedUser); // Met à jour les détails de l'utilisateur dans Firestore
      console.log("User updated successfully");
      navigate("/"); // Redirige vers la page d'accueil après la mise à jour
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (!user) {
    return <div>Loading...</div>; // Affiche une indication de chargement pendant le chargement des données de l'utilisateur
  }

  // Utilisez les détails de l'utilisateur pour pré-remplir le formulaire de mise à jour
  return (
    <div className="NewTables2 mb-4">
      <h2 className="text-center">Update User</h2>
      <div className="login-box mt-4">
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            {preview ? (
              <img src={preview} height="50px" width="100px" alt="Selected" />
            ) : user.imgUrl ? (
              <img
                src={user.imgUrl}
                height="50px"
                width="100px"
                alt={`Uploaded ${user.Name}`}
              />
            ) : (
              "No Image"
            )}
            <input type="file" onChange={handleImageChange} />

            {/* <input type="file" onChange={(e) => setImg(e.target.files[0])} /> */}
            <br />
            <label style={{ marginTop: "-20px" }}>Image :</label>
          </div>
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

            <label>City:</label>
          </div>
          <div className="user-box">
          <input
  type="text"
  value={user.Pin}
  onChange={(e) => setUser({ ...user, Pin: e.target.value })}
/>

            <label>Pin Code:</label>
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
            <button
              type="button"
              className="text-black"
              onClick={() => navigate(-1)}
            >
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
