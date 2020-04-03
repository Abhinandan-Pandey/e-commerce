import React from 'react';
import {connect} from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Items from '../Category/Items/Items';
import classes from './Category.module.css';
import * as actions from '../../store/actions/index';

const category=(props)=>{
    // console.log(props)
    
   const items=props.items.map((item)=>{
      return <Items key={item.id} item={item} clicked={()=>props.itemSelector(item)}/>
   })
    return(
    <Auxiliary>
        <h2 className={classes.Title}>{props.category}</h2>
        <div className={classes.Category}>
        {items}
        </div>
    </Auxiliary>
    )
}

const mapDispatchToProps=(dispatch)=>{
    return{
         itemSelector:(item)=>dispatch(actions.itemSelector(item))
    }
}

export default connect(null,mapDispatchToProps)(category);