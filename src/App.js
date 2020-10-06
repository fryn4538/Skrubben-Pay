import React, {useState} from 'react';
import './App.css';
import {listOfItems} from './items.js';



function App() {

  const [cart, setCart] = useState([]);
  const [cost, setCost] = useState(0);  
  const [items, setItems] = useState(listOfItems);

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
        setCost(cost - Number(product.price));
        break;
      }
    }

    setCart([...cart]);
  }

  const addToCart = (product) => {
      setCart([...cart,product]);
      setCost(cost + Number(product.price));
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

  const seachFilter = event => {
    const tmp = [];
    const str = event.target.value.toUpperCase(); 
    for(var i = 0; i<listOfItems.length; ++i){
        if(listOfItems[i].name.toUpperCase().includes(str)){
            tmp.push(listOfItems[i]);
        }
    }

    setItems(tmp);
  }

  return (
    <div className="App">
      <header>
        <h1>Skrubben-Pay</h1>
      </header>
      
      <div>
        <input type="text" className="search" onChange={seachFilter} name="fname" placeholder="Search for items"/>
      </div>

      {items.map((item,key) =>(
        <div className='cards'>
          <div className='card'>
            <img className='size' src={item.img} alt=""></img>
          </div>
          
          <p className='card'>{item.price} kr</p>

          <div className='card'>
            <button className='inline button' onClick={() => removeFromCart(item)}>
              <p className="buttonText">-</p>
            </button>
            <p className='inline'>
              {numOfItems(item)}
            </p>
            <button className='inline button' onClick={() => addToCart(item)}>
              <p className="buttonText">+</p>
            </button>
          </div>
        </div>
      ))}
      <footer onClick={onSwish}>
        <p>Swisha {cost} kr</p>
      </footer>
    </div>
    
  );
}

export default App;
