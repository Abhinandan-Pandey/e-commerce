import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';
import Spinner from '../../UI/Spinners/Spinner';
import Category from '../../components/Category/Category';
import Item from '../../components/Category/Items/Item/Item';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../store/actions//index'; 
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Products extends Component{
 
    componentDidMount(){
       this.props.fetchProducts()
      }
render(){  
  let item=null;
  let categories=<Spinner/>
  if(!this.props.loading){ 
   categories=Object.keys(this.props.products).map(ctgry=>{
    return(
    <Category items={this.props.products[ctgry]} category={ctgry} key={ctgry}/>
    )
  })
}
if(this.props.item){
  item=<Item item={this.props.item}/>
}
  return(
    <Auxiliary>
           <Modal show={this.props.show} modalClosed={this.props.detailsClosed}>
             {item}
           </Modal> 
           {categories} 
    </Auxiliary> 
    )
  }
}  

const mapStateToProps=(state)=>{
   return{
    item:state.UI.item,
    show:state.UI.show,
    products:state.UI.products,
    loading:state.UI.loader,
   }
}
const mapDispatchToProps=(dispatch)=>{
  return{
     detailsClosed:()=>dispatch(actions.detailsClosed()),
     fetchProducts:()=>dispatch(actions.fetchProducts())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Products,axios));