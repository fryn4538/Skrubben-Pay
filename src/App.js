import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isMobile } from 'react-device-detect';

import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUndoAlt } from '@fortawesome/free-solid-svg-icons';

import './App.css';
import {listOfItems} from './items.js';



function App() {

  const [toSwish, setToSwish] = useState(false);
  const [cart, setCart] = useState([]);
  const [cost, setCost] = useState(0);  
  const [items, setItems] = useState(listOfItems);


  function toTop(){
    window.scrollTo({
      top: 0,
    });
  }
  function onSwish(){
    toTop();
    if(!toSwish){
      var dispCart = [];
      for(var i = 0; i < cart.length; i++){
         if(!dispCart.includes(cart[i])){
           dispCart.push(cart[i]);
         }
      }
      setItems(dispCart);
      setToSwish(true);   
    } else {
      if(isMobile){ 
        console.log(isMobile);
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
        if(msg.length > 50){
          alert("Too many items added!");
        } else {
          var tStart = new Date().getTime();
          window.location = 'swish://payment?data=%7B%22version%22%3A1%2C%22payee%22%3A%7B%22value%22%3A%20%221236130983%22%7D%2C%22amount%22%3A%7B%22value%22%3A' + price.toString() + '%7D%2C%22message%22%3A%7B%22value%22%3A%22'+ msg +'%22%7D%7D'
          var tEnd = new Date().getTime();
        }
      } else {
        alert("You have to be on a mobile device");
      }     
      onBack();
    }
    
    return;
  }

  function onReset(){
    setCart([]);
    setCost(0);
    setItems(listOfItems);
    document.getElementById("searchInput").value = "";
   
    return;
  }

  function onBack(){
    toTop();
    setItems(listOfItems);
    setToSwish(false);
    document.getElementById("searchInput").value = "";
    
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
    if(cart.length == 0){
        setToSwish(false);
        setItems(listOfItems);
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
        <h2 className={toSwish === false ? 'hidden' : ''}>In cart</h2>
      </header>
      
      <div >
        <input type="text" id="searchInput" className={toSwish ? "hidden" : "search inline"} onChange={seachFilter} name="fname" placeholder="Search for items"/>
      </div>

      {items.map((item,key) =>(
        <div className='cards'>
          <div className='card'>
            <img className='size' src={item.img} alt=""></img>
          </div>
          
          <p className='card'>{item.price} kr</p>

          <div className='card'>
            <button className= {toSwish ? 'hidden' : 'inline button'}onClick={() => removeFromCart(item)}>
              <p className="buttonText">-</p>
            </button>
            <p className={toSwish ? 'pToSwish inline' : 'inline'}>
              {numOfItems(item)} {toSwish ? "st" : ""}
            </p>
            <button className={toSwish ? 'hidden' : 'inline button'} onClick={() => addToCart(item)}>
              <p className="buttonText">+</p>
            </button>
          </div>
        </div>
      ))}

      <footer className={cost === 0 ? 'hidden' : ''}>
        <a className={toSwish ? "hidden" : "second"} onClick={onReset}><FontAwesomeIcon icon={faTrash} href="#" /> Reset</a>
        <p className={toSwish ? "hidden" : "first"}>Cost {cost} kr</p>
        <a className={toSwish ? "hidden" : "third"} onClick={onSwish}><FontAwesomeIcon icon={faShoppingCart} href="#" />  Cart</a>
        <a className={toSwish ? "" : "hidden"} onClick={onBack}><FontAwesomeIcon icon={faUndoAlt} href="#" />  back</a>
        <a className={toSwish ? "" : "hidden"} onClick={onSwish}><FontAwesomeIcon icon={faCoins} href="#" />  Swish</a>
      </footer>
    </div>
    
  );
}

export default App;
