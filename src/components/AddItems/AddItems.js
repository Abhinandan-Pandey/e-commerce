import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Spinner from '../../UI/Spinners/Spinner';
import classes from './AddItems.module.css';
import axios from '../../axios-orders';
import Input from '../../UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Modal from '../../UI/Modal/Modal';
import * as actions from '../../store/actions';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class AddItems extends Component {
    state = {
        productForm: {
            ItemName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Item Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'category'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Price'
                },
                value: '',
                validation: {
                    required: true,
                    isNumeric: true
                },
                valid: false,
                touched: false
            },
            details: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Details'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            description: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            imageLink: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'imageLink'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    }

    orderHandler = ( event ) => {
        event.preventDefault();
  
        const formData = {};
        for (let formElementIdentifier in this.state.productForm) {
            formData[formElementIdentifier] = this.state.productForm[formElementIdentifier].value;
        }
        const productData = {
            orderData: formData
        }

        this.props.dispatchProductDetails(productData,this.props.token);
        
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.productForm
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
        this.setState({productForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.productForm) {
            formElementsArray.push({
                id: key,
                config: this.state.productForm[key]
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
                <Button variant='contained' color='primary' 
                onClick={this.orderHandler} disabled={!this.state.formIsValid}>Add Product</Button>
            </form>
        );
        if ( this.props.loading ) {
            form = <Spinner />;
        }
        const addMoreItems=()=>{
           this.props.modalHandler()
        }
        const backToProducts=()=>{
            this.props.modalHandler()
            this.props.history.push('/')
        }
        
        return (
            <Auxiliary>
                <Modal show={this.props.show} modalClosed={this.props.modalHandler}>
                    <h3>Your Product has been added Successfully!</h3>
                    <Button variant='contained' onClick={backToProducts}
                    color='secondary'>Go back to Products page</Button>
                     <Button variant='contained' onClick={addMoreItems} style={{marginTop:'5px'}}
                    color='primary'>click Here to add more items</Button>
                </Modal>
            <div className={classes.ContactData}>
                <h4>Enter your Product Data</h4>
                {form}
            </div>
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.UI.loading,
        token:state.auth.token,
        show:state.UI.modal
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatchProductDetails: (productData,token) => dispatch(actions.addProducts(productData,token)),
        modalHandler:()=>dispatch(actions.addProductsModalHandler()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(AddItems, axios));