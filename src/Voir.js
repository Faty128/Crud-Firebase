import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { db } from './config/firebase';

const Voir = () => {

    const { id } = useParams();  //permette

    const [seeUser, setSeeUser] = useState({
        Name: "",
        Adress: "",
        City: "",
        Pin: "",
        Country: "",
    })

    useEffect(() => {
        getSeeData()
    })

    const getSeeData = async () => {
    try {
        const userDf = doc(db, "user", id);
        const queryUser = await getDoc(userDf)
        if (queryUser.exists()) {
            const data = queryUser.data();
            setSeeUser(data);
        } else {
            console.error("No course found with ID:", id);
        } 
    } catch (error) {
        console.error("Error fetching data:", error);
    }
    }

return (
    <div className='text-center user-details'>
        <h1>Loading user détails...</h1>
        <div className='text-start justify-content-center bg-light details'>
        <span className='text-dark'>{seeUser.Name}</span> <br />
        <span>{seeUser.Adress} details </span> <br />
        <span>{seeUser.City}</span> <br />
        <span>{seeUser.Pin}</span> <br />
        <span>{seeUser.Country}</span>
        </div>
        <Link to="/">
            <button className="btn btn-edit">Go Back</button>
        </Link>
    </div>
)
}

export default Voir;
