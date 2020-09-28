import React from 'react';
import './App.css';
import Item from './Item';
import {listOfItems} from './items.js';

function App() {
  var cost = 0;
  var msg = "";
  
  function onSwish(){
    window.location = 'swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%20%221236130983%22%7D%2C%22amount%22%3A%7B%22value%22%3A' + '10'+'%7D%2C%22message%22%3A%7B%22value%22%3A%22'+ 'Hello' +'%22%7D%7D'
    return;
  }
  return (
    <div className="App">
      <header>
        <h1>Skrubben-Pay</h1>
      </header>
      {listOfItems.map((item,key) =>(
        <Item 
          name={item.name}
          price={item.price}
          img={item.img}
          id={item.id}
        />
      ))}
      <footer>
        <button onClick={onSwish}>Swish</button>
      </footer>
    </div>
    
  );
}

export default App;
