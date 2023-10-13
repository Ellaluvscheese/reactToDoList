import React, { useState } from 'react';
// import Searchbar from './searchbar';
// import taskDone from './taskDone';
import './App.css';

function App() {
  return (
    <div className="App">
      <TypedUserItem></TypedUserItem>
      {/* <Searchbar></Searchbar> */}
    </div>
  );
}

function TypedUserItem(){
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [count, setCount] = useState(0);
  const [nextId, setNextId] = useState(1);
  
  const updateCounterClicked = () => {
        setCount(count + 1)
  };

  const deleteItem = (itemId) => {
    const updatedItems = list.filter( item => item.id !== itemId);
    setList(updatedItems);
  }

  const doneButtonClicked = (itemId) => {
    updateCounterClicked();
    deleteItem(itemId);
  }

  const updateList = () => {
    if (inputValue.trim() !== ''){
      const newItem = {
        id: nextId,
        text: inputValue,
      };
      setList([...list, newItem]);
      setNextId(nextId + 1);
      setInputValue('');
    };
  };

  return(
    <form>
      <label for="text-form">Add an item to your To-do: </label>
      <input type="text" value={inputValue} onChange={ (e) => setInputValue(e.target.value)} autoComplete='off' />
      <button type='button' onClick={updateList}>Add item</button>

      <ul>
        {list.map((item, index) => (
          <li key={index}>{item.text} <button id='doneButton' type='button' onClick={ () => doneButtonClicked(item.id)} >Done</button></li> 
        ))}
      </ul>
      <h3>Finished task Counter: {count}</h3>
      
    </form>
  );
}

// function ButtonState(){
//   const [title, setTitle] = useState("");
//   const [count, setCount] = useState(0);
//   const updateTitleClicked = () => {
//     setTitle("LOL")
//   };
//   const updateCounterClicked = () => {
//     setCount(count + 1)
//   };

//   return(
//     <>
//       <Data title={title} count={count} ></Data>
//       <button onClick={updateTitleClicked}>Update Title</button>
//       <button onClick={updateCounterClicked}>Updates Counter</button>
//     </>
//   );
// }

// function Data(props) {
//   return(
//     <div>
//       <p>Title: {props.title} </p>
//       <p>Count: {props.count}</p>
//     </div>
//   );
// }


export default App;
