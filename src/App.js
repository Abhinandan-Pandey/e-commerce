import React,{Component} from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from'./App.module.css';
import Products from './containers/Products/Products';
import Layout from './hoc/Layout/Layout';
import Cart from './containers/Cart/Cart';
import Orders from './containers/Orders/Orders';
import AddItems from './components/AddItems/AddItems';
import Auth from './containers/Auth/Auth';
import * as actions from './store/actions/index';
import Logout from './components/Logout/Logout';

class App extends Component {

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Products} />
        <Route path='/cart' component={Cart}/>
        <Redirect to="/" />
      </Switch>
    );
    if(this.props.isAuthenticated){
      routes=(
        <Switch>
        <Route path="/auth" component={Auth} />
        <Route path='/cart' component={Cart}/>
        <Route path='/orders' component={Orders}/>
        <Route path='/add-items' component={AddItems}/>
        <Route path="/" exact component={Products} />
        <Route path="/logout" component={Logout} />
      </Switch>
      )
    }
      return (
        <div className={classes.App}>
          <Layout>
           {routes}
          </Layout>
        </div>
      );
   }
}
const mapStateToProps=(state)=>{
  return {
    isAuthenticated: state.auth.token !== null
  };
}
const mapDispacthToProps=(dispatch)=>{
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
}

export default withRouter(connect(mapStateToProps,mapDispacthToProps)(App));
