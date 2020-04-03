import  React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Items.module.css';

const items=(props)=>{
    // console.log(props.item)
    return(
       <Auxiliary>
           <div className={classes.Items} 
             onClick={props.clicked}>
              <img src={props.item.orderData.imageLink} alt={props.item.orderData.category}/>
              <h2 style={{marginTop:'0px',marginBottom:'0px'}}>{props.item.orderData.ItemName}</h2>
              <b>Price: ${props.item.orderData.price}</b>
              <h5 style={{marginTop:'0px'}}>{props.item.orderData.description}</h5>
           </div>
       </Auxiliary>
    )
}

export default items;