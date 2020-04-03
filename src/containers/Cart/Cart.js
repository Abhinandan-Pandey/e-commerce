import React from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Checkout from '../Checkout/Checkout';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../store/actions';

const Cart=(props)=>{
// console.log(props)
const proceedToCheckout=()=>{
    if(props.isAuthenticated){
        props.history.replace( '/cart/checkout' )
    } else{
      props.redirectLink('/cart/checkout')
       props.history.push('/auth')
}
}
const backToshopping=()=>{
    props.detailsClosed();
  props.history.push('/');
}

let cartItems=<Redirect to='/'/>
    let setDisplay=false;
if(props.items.length!==0){
 setDisplay='true'
 cartItems=props.items.map((item,i)=>{
 return(<Paper elevation={3} style={{padding:'15px',display: 'flex',flexDirection: 'row',
          justifyContent: 'space-between'}} key={item.id+i}>
     <div>{item.orderData.ItemName}</div>
     <div>R.s &nbsp;{item.orderData.price}</div>
     </Paper>)
})
}
let buttons=null;
let totalPrice=null;
let checkout=null;
if(setDisplay){
   totalPrice= <Paper elevation={3} style={{padding:'15px',display: 'flex',flexDirection: 'row',
          justifyContent: 'space-between'}}>
     <div><h3>Total Amount</h3></div>
     <div><h3>R.s &nbsp;{props.price}</h3></div>
     </Paper>

    buttons= <div style={{marginTop:'10px'}}>
    <Button variant="contained" color='primary' style={{marginBottom:'10px'}}
       onClick={proceedToCheckout}>Proceed to Checkout</Button>
    <Button variant="contained" color='primary' style={{marginBottom:'10px',marginLeft:'10px'}}
        onClick={backToshopping}>Click to shop More</Button>
    </div>
    checkout=<Route
    path={props.match.path + '/checkout'}
    component={Checkout} />
}
let modal=null;
 if(props.show){
    //  console.log(props.show)
     modal=(<Modal show={props.show} modalClosed={props.modalHandler}>
     <div>
         <h2>Thank you for Shopping with us.</h2><br/>
         <h3>Your Order has been Placed Successfully.</h3>
     </div>
     </Modal>)
 }
    return(
    <Auxiliary>
        <div>
          {cartItems}
         </div>
         {totalPrice}
        {buttons}
        {checkout}
        {modal}
     </Auxiliary>
    )
}

const mapStateToProps=(state)=>{
    return{
        items:state.cart.items,
        price:state.cart.price,
        show:state.cart.show,
        isAuthenticated:state.auth.isAuthenticated,
    }
}
const mapDispatchToprops=(dispatch)=>{
    return{
        modalHandler:()=>dispatch(actions.cartInit()),
        detailsClosed:()=>dispatch(actions.detailsClosed()),
        redirectLink:(redirectLink)=>dispatch(actions.authRedirect(redirectLink)),
    }
}
export default connect(mapStateToProps,mapDispatchToprops)(Cart);