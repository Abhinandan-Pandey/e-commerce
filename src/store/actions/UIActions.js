import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const loading=()=>{
    return{
        type:actionTypes.LOADING,
    }
}

export const itemSelector=(item)=>{
    return{
        type:actionTypes.ITEM_SELECTOR,
        item:item,
        show:true,
    }
};
export const detailsClosed=()=>{
    return{
        type:actionTypes.DETAILS_CLOSED,
        show:false,
    }
}
export const ordersCount=(prevOrders)=>{
    const total=prevOrders.reduce((total,eachOrder)=>{
      return total=total+eachOrder.items.length
    },0)
    return{
        type:actionTypes.ORDERS_COUNT,
        totalOrders: total,
    }
}
export const fetchProductsStart=()=>{
    return{
        type:actionTypes.FETCH_PRODUCTS_START,
    }
}
export const fetchProductsFail=()=>{
   return{
    type:actionTypes.FETCH_PRODUCTS_FAIL,
   }
}
export const fetchProductsSuccess=(categories)=>{
   return{
        type:actionTypes.FETCH_PRODUCTS_SUCCESSS,
        categories:categories,
        loading:false,
    }
}
export const fetchProducts=()=>{
    return dispatch=>{
        dispatch(fetchProductsStart())
        axios.get('/orders.json')
        .then(res=>{
            const products=[];
            for(let key in res.data){
               products.push({
                   ...res.data[key],
                   id:key
            })
            }
           const categories= products.reduce((category,item)=>{
               category[item.orderData.category]=category[item.orderData.category]||[]
               category[item.orderData.category].push(item)
               return category
            },{})
            // console.log(categories)
        dispatch(fetchProductsSuccess(categories))
        })
        .catch(error=>{
            dispatch(fetchProductsFail())
        })
    }   
}

export const addProductsFailed=()=>{
    return{
        type:actionTypes.ADD_PRODUCTS_FAILED,
    }
}
export const addProductsStart=()=>{
    return{
        type:actionTypes.ADD_PRODUCTS_START,
    }
}
export const addProductsSuccess=()=>{
    return{
        type:actionTypes.ADD_PRODUCTS_SUCCESS,
    }
}
export const addProducts=(productdata,token)=>{
    return dispatch=>{
        dispatch(addProductsStart())
        axios.post('/orders.json?auth='+token,productdata)
        .then(res=>{
            console.log(res.data)
            dispatch(addProductsSuccess())
        })
        .catch(error=>{
            console.log(error.message)
            dispatch(addProductsFailed())
        })
    }
}
export const addProductsModalHandler=()=>{
    return{
        type:actionTypes.ADD_PRODUCTS_MODAL_HANDLER,
    }
}