import React from 'react';

const Item = ({name,price,img,id}) => {
  return(
    <div>
      <img alt=""></img>
      <p>{name}</p>
      <a>{price}</a>
      <div >
        <button>-</button>
        <input class='counter' type="text" placeholder="value..." value='0' /> 
        <button class='up_count btn btn-info' title='Up'>+</button>
      </div>
    </div>
  );
}
export default Item;
