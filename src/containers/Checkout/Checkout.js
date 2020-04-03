import React,{Component} from 'react';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import *as actions from '../../store/actions';
import Spinner from  '../../UI/Spinners/Spinner';
import Input from '../../UI/Input/Input';
import classes from './Checkout.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Checkout extends Component{
    state={
        adrForm:{
           name:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name',
                },
                value:'',
                validation:{
                       required:true,
                },
                valid:false,
                touched:false,
            },
            city:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your City'
                },
                value:'',
                validation:{
                   required:true,
                },
                valid:false,
                touched:false,
            },
            zip:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your PIN',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6,
                    maxLength:6,
                    isNumeric:true,
                },
                    valid:false,
                    touched:false,
                
            },
            state:{
                elmentType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your State',
                },
                value:'',
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
            },
            mobile:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Mobile Number',
                },
                value:'',
                validation:{
                    required:true,
                    minLength:10,
                    maxLength:10,
                    isNumeric:true,
                },
                    valid:false,
                    touched:false,
                
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Country'
                },
                value:'',
                validation:{
                  required:true,
                },
                valid:false,
                touched:false,
            }
        },
        formIsValid:false,
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }
    orderHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.adrForm) {
            formData[formElementIdentifier] = this.state.adrForm[formElementIdentifier].value;
        }
        const order = {
            items: this.props.items,
            price: this.props.price,
            orderData: formData,
            userId:this.props.userId,
        }
        this.props.onOrder(order,this.props.token,this.props.userId);        
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.adrForm
        };
        const updatedFormElement = { 
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({adrForm: updatedOrderForm,formIsValid: formIsValid});
    }

    render(){ 
        const formElementsArray = [];
        for (let key in this.state.adrForm) {
            formElementsArray.push({
                id: key,
                config: this.state.adrForm[key]
            });
        }
        let form = (
            <form >
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button variant="contained" disabled={!this.state.formIsValid}
                color="primary" onClick={this.orderHandler}>ORDER</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        items:state.cart.items,
        price:state.cart.price,
        loading:state.cart.loading,
        token:state.auth.token,
        userId:state.auth.userId,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onOrder:(order,token,userId)=>dispatch(actions.checkout(order,token,userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Checkout,axios));

