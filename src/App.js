import React, {useState} from 'react';
import './App.css';
import {listOfItems} from './items.js';



function App() {

  const [cart, setCart] = useState([]);
  
  function onSwish(){
    var price = 0;
    var msg = "";
    var itemsInCart = [];

    for(var i = 0; i<cart.length; ++i){
      price = price + Number(cart[i].price);
      if(itemsInCart.includes(cart[i].id)){
        itemsInCart[itemsInCart.indexOf(cart[i].id)-1]++;
      } else {
        itemsInCart.push(1);
        itemsInCart.push(cart[i].id);
      }
    }

    msg = itemsInCart.join('');
    console.log(msg);
    window.location = 'swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%20%221236130983%22%7D%2C%22amount%22%3A%7B%22value%22%3A' + price.toString() + '%7D%2C%22message%22%3A%7B%22value%22%3A%22'+ msg +'%22%7D%7D'
    return;
  }

  const removeFromCart = (product) => {
    console.log(cart);
    for(var i = 0; i < cart.length; ++i){
      if(cart[i] === product){
        cart.splice(i,1);
        break;
      }
    }

    setCart([...cart]);
  }

  const addToCart = (product) => {
      setCart([...cart,product]);
  }
  
  const numOfItems = (product) => {
      var count = 0;
      for(var i = 0; i < cart.length; ++i){
        if(cart[i] === product){
          count++; 
        }
      } 
      return count;
  }

  return (
    <div className="App">
      <header>
        <h1>Skrubben-Pay</h1>
      </header>
      {listOfItems.map((item,key) =>(
        <div className='card'>
          <div className='inline'>
            <img className='size' src={item.img} alt=""></img>
            <p className=''>{item.name}</p>
          </div>
          
          <p className='inline'>{item.price} kr</p>

          <div className='inline'>
            <button onClick={() => removeFromCart(item)}>-</button>
            <p>
              {numOfItems(item)}
            </p>
            <button onClick={() => addToCart(item)} className=''>+</button>
          </div>
        </div>
      ))}
      <footer>
        <a onClick={onSwish}>Swish</a>
      </footer>
    </div>
    
  );
}

export default App;
