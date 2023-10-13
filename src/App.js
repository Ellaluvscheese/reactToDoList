import React, { useState } from 'react';

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

  // returns html the html elements
  return(
    <form>
      <label for="text-form">Add an item to your To-do: </label>
      {/* gets the user input and tracks the text value */}
      <input type="text" value={inputValue} onChange={ (e) => setInputValue(e.target.value)} autoComplete='off' />
      {/* the button to click when you want to add the input to the list */}
      <button type='button' onClick={updateList}>Add item</button>

      <ul>
        {/* adds the items in the list onto the page and creates a button to click when done with task */}
        {list.map((item, index) => (
          <li key={index}>{item.text} <button id='doneButton' type='button' onClick={ () => doneButtonClicked(item.id)} >Done</button></li> 
        ))}
      </ul>
      {/* Shows the number of finished tasks */}
      <h3>Finished task Counter: {count}</h3>
      
    </form>
  );
}

export default App;
