import * as actionTypes from '../actions/actionTypes';

const intialState={
            items:[],
            price:0,
            loading:false,
            show:false,
           };

const cartReducer=(state=intialState,action)=>{
    switch (action.type){
        case actionTypes.ADD_TO_CART :
            return{
              items:state.items.concat(action.item),
              price:state.price+ +action.item.orderData.price,
            }
        case actionTypes.CHECKOUT_SUCCED :
            return{
                ...state,
                loading:false,
                show:true,
            }
        case actionTypes.CHECKOUT_START :
            return{
                ...state,
                loading:true,
            }
        case actionTypes.CHECKOUT_FAILED :
            return{
                ...state,
                loading:false,
            }
        case actionTypes.CART_INIT :
            return{
                ...state,
                items:[],
                price:0,
                show:false,
            }
        default : return state;
    }
}

export default cartReducer;