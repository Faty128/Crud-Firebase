import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Addtable from './Addtable';
import './App.css';
import Crud from './Crud';
import Voir from './Voir';
import UpdateUser from './UpdateUser';
import ArchivedUsers from './Archived';

function App() {
  return (
    <div className="App"> 
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Crud />} />
            <Route path='/Addtable' element={<Addtable/>} />
            <Route path='/Voir/:id' element={<Voir/>} />
            <Route path='/UpdateUser/:id' element={<UpdateUser/>} />
            <Route path="/Archived" element={<ArchivedUsers />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
