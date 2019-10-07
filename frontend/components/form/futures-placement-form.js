import React from 'react';
import Router from 'next/router';
import {Formik, Form, ErrorMessage} from 'formik';
import {Persist} from 'formik-persist';
import {Mutation} from 'react-apollo';
import * as Yup from 'yup';
import {withRouter} from 'next/router';

import {CREATE_FUTURE} from '../api';
import SelectGroup from './select-group';
import TypeSelect from './type-select';
import SizeSelect from './size-select';
import Price from './price';
import {calculatePrice, calculateAmountToPay} from './price-calculator';
import Input from './input';
import Submit from './submit';

import RegionInput from "./region";
import CountryInput from "./country";

// Custom form validation
const futureSchema = Yup.object().shape({
    name: Yup.string()
    // Regex for checking full name, https://stackoverflow.com/a/45871742
        .matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Please enter first/lastname'),
    phone: Yup.string()
    // Regular expression for checking Polish phone numbers, https://github.com/skotniczny/phonePL
        .matches(/^\+?(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/, 'Please enter US Phone number. Example: +1-234-555-5678'),
    total: Yup.number().positive("Please select product type and weight")

});

// https://exchange.swissx.com/sell?copayerId=df57b7c96d139cdbdf41c897f98d2bb54d4e80e0409d6fddf0879f0bcd95ac6f&wallet=cfe8d06b-91b7-4e4e-a35f-b0b50d0fcadf&walletName=testwallet
export const FuturePlacementForm = ({router: {query}}) => {

    const {rate, product, copayerId, wallet, walletName} = query;
    const selectedProduct = product;

    return (
        <Mutation
            mutation={CREATE_FUTURE}
        >
            {(createfuture, {loading, error}) => {
                const formSubmit = async (values, {setSubmitting, resetForm}) => {
                    console.log("On Submit!");
                    await setSubmitting(false);

                    const future = {
                        variables: {
                            ...values,
                            time: "" + (+new Date()),
                            paid: true,
                            copayerId, wallet, walletName, rate,
                            price: calculatePrice(product ? product: values.type, values.size, rate)
                        }
                    };

                    if (! values.onlinePayment) {
                        future.variables.paid = false;
                    }
                    console.log("Submitting): ", future);
                    await createfuture(future).then(async data => {
                        console.log("Futures created:", data);
                        const futureID = await data.data.createFuture.id;

                        // https://github.com/jaredpalmer/formik-persist/issues/16
                        await resetForm();
                        await resetForm();

                        console.debug("Redirecting to future status page....");
                        // Move user to the thank you page
                        return Router.push({
                            pathname: '/futures',
                            query: {id: futureID}
                        });
                    }).catch(error => {
                        console.error("Could not create future: ", error);
                    });
                };

                return (
                    <Formik
                        initialValues={{
                            type: '',
                            size: '1 kg',
                            //	dough: '',
                            name: '',
                            phone: '',
                            country: '',
                            state: '',
                            city: '',
                            zipCode: '',
                            address_line1: '',
                            address_line2: '',
                            total: 0
                        }}
                        //validationSchema={futureSchema}
                        onSubmit={formSubmit}
                    >
                        {({handleSubmit, handleChange, handleBlur, values, setFieldValue, isValid}) => {
                            const total = calculateAmountToPay(product || values.type, values.size, rate);
                            return (
                                <Form>
                                    <SelectGroup>
                                        { rate && product && <h4>SELL {product} at {rate} CHF/kg</h4>}
                                        {
                                            (! rate || ! product) && <TypeSelect label="Select a product you want to sell"
                                                                                 value={values.type || ""}
                                                                                 name="type" id="type"
                                                                                 onChange={handleChange}
                                                                                 onBlur={handleBlur}
                                                                                 selected={selectedProduct} />
                                        }
                                        <SizeSelect value={values.size || ""} name="size" id="size" onChange={handleChange} onBlur={handleBlur}/>

                                    </SelectGroup>
                                    <br/>
                                    <Price rate={rate} size={values.size} amount={calculatePrice(product? product: values.type, values.size, rate)}/>
                                    <br/>
                                    <strong> Please leave your contact details:</strong>
                                    <br />
                                    <br />
                                    <Input value={values.name||""} id={"name"} handleChange={handleChange} handleBlur={handleBlur}
                                           label="Full Name:" autoComplete="name" type="text" name="name" placeholder="Seller Name" required/>
                                    <Input value={values.phone||""} id={"phone"} handleChange={handleChange} handleBlur={handleBlur}
                                           label="Phone:" autoComplete="tel" type="tel" name="phone" placeholder="+1-234-555-5678" required/>
                                    <CountryInput value={values.country||""} id={"country"} handleChange={handleChange}
                                                  label="Country:" priorityOptions={["CA", "US", "GB"]} type="text" autoComplete="country" name="country" placeholder="country" required/>
                                    <RegionInput value={values.state||""} id={"state"}  country={values.country} handleChange={handleChange}
                                                 label="State:" type="text" name="state" autoComplete="address-level1" placeholder="State / Province" required/>
                                    <Input value={values.city||""}
                                           id={"city"} handleChange={handleChange} handleBlur={handleBlur}  label="City:" type="text" name="city" autoComplete="city" placeholder="City" required/>
                                    <Input value={values.zipCode||""} id={"zipCode"}
                                           handleChange={handleChange} handleBlur={handleBlur}  label="zipCode" type="text" autoComplete="postal-code" name="zipCode" placeholder="zipCode" required/>

                                    {/*
                                   <Input value={values.address_line1||""} id={"address1"}
                                           handleChange={handleChange} handleBlur={handleBlur}  label="Address Line 1:" autoComplete="street-address" type="text" name="address_line1" placeholder="Street address or PO box" required/>
                                    <Input value={values.address_line2||""} id={"address_line2"}
                                           handleChange={handleChange} handleBlur={handleBlur}  label="Address Line 2:"  autoComplete="address-line2" type="text" name="address_line2" placeholder="Appartment/Suite number, unit, building, floor, etc" required/>
                                    <br/>
                                    */}
                                    { /* <TimeSelect value={values.time} onChangeText={handleChange} name="time" placeholder="Expected sell time"/> */}
                                    <br/>
                                    <input type="hidden" name="total" value={total} />

                                    <br/>
                                    <br/>

                                    <Submit loading={loading} onClick={handleSubmit}/>

                                    {error && <p>Something went wrong. Try again later.</p>}
                                    <Persist name="futures-placement-form" debounce={100} isSessionStorage/>
                                </Form>
                            );
                        }
                        }
                    </Formik>
                )}}
        </Mutation>
    );
};

export default withRouter(FuturePlacementForm);
