import React from 'react';
import Header from '../../UI/Navigation/Header/Header';
import Footer from '../../UI/Navigation/Footer/Footer';
import Auxiliary from '../Auxiliary/Auxiliary';
import  {withRouter} from 'react-router-dom';

const layout=(props)=>{

    return(
    <Auxiliary>
        <Header {...props}/>
        <div style={{marginTop:'75px'}}>
           {props.children}
        </div>
        <Footer/>
    </Auxiliary>
    )
}

export default withRouter(layout);