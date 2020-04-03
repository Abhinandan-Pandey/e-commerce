import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addToCart=(item)=>{
    return{
        type:actionTypes.ADD_TO_CART,
        item:item,
    }
};
export const checkoutStart=()=>{
    return{
        type:actionTypes.CHECKOUT_START,
    }
}
export const checkoutSucced=()=>{
    return{
    type:actionTypes.CHECKOUT_SUCCED,
    }
}
export const checkoutFailed=()=>{
    return{
    type:actionTypes.CHECKOUT_FAILED,
    }
}
export const checkout=(order,token)=>{
    return dispatch=>{
        dispatch(checkoutStart());
      axios.post('/orderPlaced.json?auth='+token,order)
      .then(res=>{
         console.log(res.data);
         dispatch(checkoutSucced(res.data));
      })
      .catch(error=>{
          dispatch(checkoutFailed())
      })
    }
}
export const cartInit=()=>{
    return{
        type:actionTypes.CART_INIT,
    }
}

