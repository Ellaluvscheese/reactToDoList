import React, { useState } from 'react';
import { app } from './firebaseConfig';
import './App.css';

function App() {
  return (
    <div className="App">
      <TypedUserItem></TypedUserItem>
    </div>
  );
}

function TypedUserItem(){
  // this function handles several things
  // the main purpose is to get user input and put it into a list

  // creates the list of items
  const [list, setList] = useState([]);
  // placeholder for the user input
  const [inputValue, setInputValue] = useState('');
  // placeholder for finished task count
  const [count, setCount] = useState(0);
  // gives the items in the list an id
  const [nextId, setNextId] = useState(1);
  
  // adds one to the current count
  const updateCounterClicked = () => {
        setCount(count + 1)
  };

  // deletes the item and updates the list
  const deleteItem = (itemId) => {
    const updatedItems = list.filter( item => item.id !== itemId);
    setList(updatedItems);
  }

  // calls two functions: deletes the item & updates the counter
  const doneButtonClicked = (itemId) => {
    updateCounterClicked();
    deleteItem(itemId);
  }

  // adds the user input to the list
  const updateList = () => {
    // checks is the input is valid / not empty
    if (inputValue.trim() !== ''){
      // gives the item an id and text value
      const newItem = {
        id: nextId,
        text: inputValue,
      };
      // updates the list by adding the new item
      setList([...list, newItem]);
      // updates the id by adding the id + 1
      setNextId(nextId + 1);
      // creates a 'blank slate' for the user to type something else
      setInputValue('');
    };
  };

const celebrate = (count) => {
  if (count === 0){
    return
  }
  else if (count === 5) {
    alert("You did your first five tasks! :) ");
    return
  }
  else if ((count % 5) === 0){
    alert("You did it! You completed 5 more tasks! :) ");
    return
  }
};
 
  // returns html the html elements
  return(
    <form>
      <section className='card' >
        <h1>To-Do List</h1>
        <label for="text-form">Add an item: </label>
        {/* gets the user input and tracks the text value */}
        <input type="text" value={inputValue} onChange={ (e) => setInputValue(e.target.value)} autoComplete='off' />
        {/* the button to click when you want to add the input to the list */}
        <button className='buttonBoi' type='button' onClick={updateList}>Add </button>
      </section>
      <section className='card' > 
      <h2 className='listh2' >Your List:</h2>
        <ul>
          {/* adds the items in the list onto the page and creates a button to click when done with task */}
          {list.map((item, index) => (
            <li key={index}> {item.text} <button className='buttonBoi' id='doneButton' type='button' onClick={ () => doneButtonClicked(item.id)}> Done</button></li> 
          ))}
        </ul>
      </section>
      {/* Shows the number of finished tasks */}
      <h3>Finished task Counter: </h3>
      <h3 id='count'>{celebrate(count)} {count} done</h3>
      
      
    </form>
  );
}

export default App;
