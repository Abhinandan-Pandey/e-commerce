import * as actionTypes from '../actions/actionTypes';

const intialState={
    loading:null,
    show:false,
    item:null,
    ordersCount:0,
    products:null,
    loader:true,
    modal:false,
}

const UIReducer=(state=intialState,action)=>{
    switch(action.type){
        case actionTypes.LOADING :
            return{

            }
        case actionTypes.ITEM_SELECTOR :
            return{
                ...state,
                item:action.item,
                show:action.show,
            }
        case actionTypes.DETAILS_CLOSED :
            return{
                ...state,
                show:action.show,
            }
        case actionTypes.ORDERS_COUNT :
            return{
                ...state,
               ordersCount:action.totalOrders,
            }
        case actionTypes.ORDERS_COUNT_INIT :
            return{
                ...state,
                ordersCount:0,
            }
        case actionTypes.FETCH_PRODUCTS_SUCCESSS :
            return{
                ...state,
                products:action.categories,
                loader:false,
            }
        case actionTypes.ADD_PRODUCTS_START :
            return{
                ...state,
              loading:true,
            }
        case actionTypes.ADD_PRODUCTS_FAILED :
            return{
                ...state,
                loading:false,
            }
       case actionTypes.ADD_PRODUCTS_SUCCESS :
            return{
                ...state,
                loading:false,
                modal:true,
            }
        case actionTypes.ADD_PRODUCTS_MODAL_HANDLER :
            return{
                ...state,
                modal:false,
            }
        default : return state;
    }
}

export default UIReducer;