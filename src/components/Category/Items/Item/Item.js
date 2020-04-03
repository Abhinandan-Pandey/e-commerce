import  React from 'react';
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary';
import classes from './Item.module.css';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import * as actions from '../../../../store/actions/index';
import {withRouter} from 'react-router-dom';

const Items=(props)=>{  
       const items= (<div className={classes.Items}>
        <img src={props.item.orderData.imageLink} alt={props.item.orderData.category}/>
        <h2 style={{marginTop:'0px',marginBottom:'0px'}}>{props.item.orderData.ItemName}</h2>
        <b>Price: ${props.item.orderData.price}</b>
        <h5 style={{marginTop:'0px'}}>{props.item.orderData.description}</h5>
        <p>Delivery method:-{props.item.orderData.deliveryMethod}</p>
        <p>Details:-{props.item.orderData.details}</p>
        </div>)
    const buyNowHandler=()=>{
       props.history.push('/cart')
    }
    return(
       <Auxiliary>
          {items}
       <Button variant="contained" color="primary" onClick={()=>props.addToCart(props.item)}>Add to Cart</Button>
       <Button variant="contained" color='secondary' 
       style={{marginLeft:'10px'}} onClick={buyNowHandler}>Buy Now</Button>
       </Auxiliary>
    )
  }

 const mapDispatchToProps=(dispatch)=>{
   return{
    addToCart:(item)=>dispatch(actions.addToCart(item)),
    detailsClosed:()=>dispatch(actions.detailsClosed())
   }
 }

export default withRouter(connect(null,mapDispatchToProps)(Items));