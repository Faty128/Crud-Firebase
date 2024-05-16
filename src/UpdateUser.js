import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
// import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from './config/firebase';

const UpdateUser = () => {
  const { id } = useParams(); // Récupère l'identifiant de l'URL
  const history = useNavigate(); // Utilisé pour rediriger après la mise à jour

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'user', id)); // Récupère les détails de l'utilisateur depuis Firestore
        if (userDoc.exists()) {
          setUser({ id: userDoc.id, ...userDoc.data() }); // Définit l'utilisateur dans l'état local
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [id]); // Assurez-vous que cette fonction est exécutée à chaque changement de l'identifiant

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'user', id), user); // Met à jour les détails de l'utilisateur dans Firestore
      console.log('User updated successfully');
      history('/'); // Redirige vers la page d'accueil après la mise à jour
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Affiche une indication de chargement pendant le chargement des données de l'utilisateur
  }

  // Utilisez les détails de l'utilisateur pour pré-remplir le formulaire de mise à jour
  return (
    <div >
      <h2 className='text-center p-4'>Update User</h2>
      <form onSubmit={handleSubmit} className='modifier'>
        <label>Name:</label>
        <input type="text" value={user.Name} onChange={(e) => setUser({ ...user, Name: e.target.value })} /> <br />
        <label>Adress:</label>
        <input type="text" value={user.Adress} onChange={(e) => setUser({ ...user, Adress: e.target.value })} /> <br />
        <label>City-cité:</label>
        <input type="text" value={user.City} onChange={(e) => setUser({ ...user, City: e.target.value })} /> <br />
        <label>Pincode:</label>
        <input type="number" value={user.Pin} onChange={(e) => setUser({ ...user, Pin: e.target.value })} /> <br />
        <label>Country:</label>
        <input type="text" value={user.Country} onChange={(e) => setUser({ ...user, Country: e.target.value })} />
        <div className='d-flex'>
        <button type="submit" className='update'>Update</button>
        <button className="btn btn-info text-white">Go Back</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
