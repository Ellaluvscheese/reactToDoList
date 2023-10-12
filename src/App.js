import React, { useState } from 'react';
import Searchbar from './searchbar';
import './App.css';

function App() {
  return (
    <div className="App">
      <TypedUserItem></TypedUserItem>
      <Searchbar></Searchbar>
    </div>
  );
}

function TypedUserItem(){
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // const inputChange = (event) => {
  //   setInputValue(event.target.value);
  // };
  const updateList = () => {
    if (inputValue.trim() !== ''){
      setList([...list, inputValue]);
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
          <li key={index}>{item} <button type='button'>Done</button></li> 
        ))}
      </ul>
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
