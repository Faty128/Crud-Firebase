import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db, imageDb } from './config/firebase';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeFill, PencilFill, TrashFill } from 'react-bootstrap-icons';
import { Toast } from 'react-bootstrap';
import { getDownloadURL, listAll, ref } from 'firebase/storage';

const Crud = () => {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [imgUrl, setImgUrl] = useState([])

  const navigate=useNavigate();

  useEffect(() => {
    getData();
  }, []); 

  useEffect(() => {
    listAll(ref(imageDb,"files")).then(imgs=>{
        console.log(imgs)
        imgs.items.forEach(val=>{
            getDownloadURL(val).then(url=>{
                setImgUrl(data=>[...data,url])
            })
        })
    })

},[])

  const userCollection = collection(db, "user");
  
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(userCollection);
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      console.log("Data from Firestore:", data); // Debugging
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

const handleDeleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "user", id))
    getData()
//Afficher un toast pour indiquer la suppression
    Toast.success("Utilisateur suprimé avec succés");
  } catch (error) {
      console.error("Error lors de la suppression de l'utilisateur", error);
  }
}

const handleUpdateUser = (id) => {
  navigate(`/UpdateUser/${id}`);
};

const filteredUsers = users.filter((user) => {
  return (
    // user.Image.toLowerCase().includes(search.toLowerCase()) ||
    user.Name.toLowerCase().includes(search.toLowerCase()) ||
    user.Adress.toLowerCase().includes(search.toLowerCase()) ||
    user.City.toLowerCase().includes(search.toLowerCase()) ||
    user.Pin.toLowerCase().includes(search.toLowerCase()) ||
    user.Country.toLowerCase().includes(search.toLowerCase())

  )
})
  return (
    <div>
      <div className='glob'> 
      <div className='titre'>
        <h3>Customer Détails</h3>
          <button><Link to="/Addtable" className='button-link'>ajouter</Link></button>
        <form  style={{ display: "inline", marginLeft: "45%" }}>
          <input 
          type="text" 
          placeholder='Search...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>       
        <table className='tableau-style'>
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
              {filteredUsers.map((user, index) => 
                <tr key={user.id}>
                    <td>{
                    
                      imgUrl.map(dataVal=><div className='m-2'>
                          <img src={dataVal} height="50px" width="100%" alt='' />
                          <br />
                      </div>)
                    
                    }</td>
                    <td>{index + 1}</td>
                    <td>{user.Name}</td>
                    <td>{user.Adress}</td>
                    <td>{user.City}</td>
                    <td>{user.Pin}</td>
                    <td>{user.Country}</td>
                    
                    <td className='icons'>
                      <Link to={`/voir/${user.id}`}>
                        <EyeFill size={18}color='skyblue' className='ms-2' />
                      </Link>
                      <button
                        onClick={() => handleUpdateUser(user.id)}
                        className="button-delete"
                      >
                        <PencilFill size={18} color='yellow' className='ms-2' />
                      </button>
                      <button onClick={() => handleDeleteUser(user.id)} className='button-delete'>
                        <TrashFill size={18} color='red' className='ms-2' />
                      </button>
                    </td>
                </tr>
              )}
          </tbody>
        </table>
          <div className='showing'>
          <h6>Showing 5 out 25 entries</h6>
          <p className='NUM'>
            "
              1  2  3  4  5
            "
          </p>
          </div>
      </div>
    </div>
  );
}

export default Crud;