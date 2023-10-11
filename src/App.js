import './App.css';

function App() {
  return (
    <div className="App">
      <AddToDO></AddToDO>
    </div>
  );
}

function AddToDO(){
  return(
    <form>
      <label for="text-form">Add an item to your To-do: </label>
      <input type="text" id="text-form" />
      <button>Submit</button>
    </form>
  );
}

export default App;
