import React, { useEffect, useState } from 'react';
import { database, auth } from '../Config/firebase';
import { getDocs, updateDoc, doc, collection, query, where } from 'firebase/firestore';
import Header from "../components/header";
import Nav from "../components/navigationTime";
import TypedUserItem from '../components/todo';

function Main() {
    const currentUser = auth.currentUser;

    const [todoList, setTodoList] = useState([]);

    // new task added
    const [newTodo, setNewTodo] = useState("");
  
    // update task state
    // const {updatedTask, setUpdatedTask} = useState('');
  
    const CollectionRef = collection(database, "users");

    const updateToDo = async () => {
      try {
        const foundDoc = await getDocs(query(CollectionRef, where('email', '==', currentUser.email)));

      if (!foundDoc.empty) {
        const userDocument = foundDoc.docs[0];
        const docRef = doc(CollectionRef, userDocument.id);

        const updatedList = [...userDocument.data().to_do, newTodo]

        await updateDoc(docRef, {
          'to_do': updatedList})

        //  setNewTodo('');
      }else {
        console.error('User document not found. ')
      }
      } catch (err) {
        console.error(err);
      }
    }


    const getTodoList = async () =>{
        // read the data
        // set the todo list
        try {
         const data = await getDocs(CollectionRef);
         const filteredData = data.docs.map((doc) =>( {
          ...doc.data(), id: doc.id}));
          
          setTodoList(filteredData);
          // getTodoList();
        } catch (err) {
          console.error(err);
        }
      };
  
    useEffect(() => {
      getTodoList();
    }, )
  
    return (
        <div className="App">
            <Header></Header>
            <Nav></Nav>
            <div className='card'>
              <h1>To-Do List</h1>
              <label>Add an Item:</label>
              <input id='text-form' placeholder='Do the Dishes' type='string' name='taskAdder'  onChange={(e) => setNewTodo(e.target.value)}/>
              <button className='buttonBoi' onClick={updateToDo}>Submit task</button>
            </div>
            <div>
              <TypedUserItem ></TypedUserItem>
            </div>
        </div>
      );
};

export default Main;