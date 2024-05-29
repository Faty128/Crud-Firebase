import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, imageDb } from "./config/firebase";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArchiveFill,
  EyeFill,
  PencilFill,
  TrashFill,
} from "react-bootstrap-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import ReactPaginate from "react-paginate";

const Crud = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0); //DEUX LIGNES POUR LA PAGINATION
  const [itemsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      setImgUrls([]); // Clear imgUrls before fetching new URLs
      const imgListRef = ref(imageDb, "files");
      const imgs = await listAll(imgListRef);
      const urls = await Promise.all(
        imgs.items.map((val) => getDownloadURL(val))
      );
      setImgUrls(urls);
    };
    fetchImages();
  }, []);

  const userCollection = collection(db, "user");

  const getData = async () => {
    try {
      const querySnapshot = await getDocs(userCollection);
      const data = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .filter((user) => !user.archived); // Exclude archived users
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleArchiveUser = async (id) => {
    try {
      const userDoc = doc(db, "user", id);
      await updateDoc(userDoc, { archived: true });
      getData();
      toast.success("Utilisateur archivé avec succès");
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'utilisateur", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteDoc(doc(db, "user", id));
      getData();
      toast.success("Utilisateur supprimé avec succès");
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

  useEffect(() => {
    if (search && filteredUsers.length === 0) {
      setError("Aucun utilisateur n'est trouvé");
    } else {
      setError("");
    }
  }, [search, filteredUsers]);

  // PAGINATION....

  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);
  const startOffset = currentPage * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const currentItems = filteredUsers.slice(startOffset, endOffset);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div>
      <ToastContainer />
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
              <th>#</th>
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
            {currentItems.length > 0 ? (
              currentItems.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>
                    {imgUrls[index] ? (
                      <img
                        src={imgUrls[index]}
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
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="button-delete"
                    >
                      <TrashFill size={18} color="red" className="ms-2" />
                    </button>
                    <Link
                      onClick={() => handleArchiveUser(user.id)}
                      className="button-archive"
                    >
                      <ArchiveFill size={18} color="green" className="ms-2" />
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", color: "red" }}>
                  {error}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* PAGINATION */}
        <div className="showing">
          <h6>
            Showing {currentItems.length} out of {filteredUsers.length} entries
          </h6>
          <ReactPaginate
            previousLabel={"precedent"}
            nextLabel={"suivant"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Crud;
