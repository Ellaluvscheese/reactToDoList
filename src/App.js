import React from 'react';
import './App.css';
import { Auth } from './components/auth';
// import { database, auth } from './Config/firebase';
// import { getDocs, collection, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main';
import History from './pages/history';
import NotFound from './pages/404';
// import Nav from './components/navigationTime';

function App() {
  
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Auth/>} />
          <Route path='/home' element={<Main/>} />
          <Route path="/History" element={<History/>} />
          <Route path='/sign' element={<Auth/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
