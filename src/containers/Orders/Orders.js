import React,{Component} from 'react';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../UI/Spinners/Spinner';
import Paper from "@material-ui/core/Paper";
import * as actions from '../../store/actions/index';
import withErroHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state={
        prevOrders:null,
    }
 
componentDidMount(){
  const queryParams='?auth='+this.props.token+'&orderBy="userId"&equalTo="'+this.props.userId+'"'
   axios.get('/orderPlaced.json'+queryParams)
   .then(res=>{
    //    console.log(res.data)
     const prevOrder=[]
    for(let key in res.data){
         prevOrder.push(res.data[key])
      }
      this.setState({prevOrders:prevOrder});
       this.props.count(this.state.prevOrders);
    })
    .catch(error=>{
      console.log(error.message)
    })
}
componentWillUnmount(){
    this.props.ordersCountInit();
}

render(){

    let prevOrders=<Spinner/>
    if(this.state.prevOrders){
        prevOrders=this.state.prevOrders.map((order)=>{
          return order.items.map((item,i)=>{
            return(<Paper elevation={3} style={{padding:'15px',display: 'flex',flexDirection: 'row',
                    justifyContent: 'space-between'}} key={item.id+i}>
                    <div>{item.orderData.ItemName}</div>
                  <div>R.s &nbsp;{item.orderData.price}</div>
                 </Paper>)
         })
      })
   
    }
// console.log(prevOrders)
    return(
        <Auxiliary>
        <div style={{textAlign:'left',}}>
        <h3 style={{marginLeft:'10px', marginTop:'70px',marginBottom:'5px'}}>Previous Orders</h3>
        </div>
        {prevOrders}
        </Auxiliary>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
    token:state.auth.token,
    userId:state.auth.userId,
  }
}
const mapDispatchToProps=(dispatch)=>{
    return{
      count:(prevOrders)=>dispatch(actions.ordersCount(prevOrders)),
      ordersCountInit:()=>dispatch({type:'ORDERS_COUNT_INIT'}),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErroHandler(Orders,axios));