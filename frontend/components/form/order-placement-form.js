import React from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {Checkbox, Label, Radio, RadioGroup} from '@blueprintjs/core';
import {Formik, Form, ErrorMessage} from 'formik';
import {Persist} from 'formik-persist';
import {Mutation} from 'react-apollo';
import StripeCheckout from 'react-stripe-checkout';
import * as Yup from 'yup';
import {withRouter} from 'next/router';

import {CREATE_ORDER} from '../api';
import SelectGroup from './select-group';
import TypeSelect from './type-select';
import SizeSelect from './size-select';
import Price from './price';
import {calculatePrice, calculateAmountToPay} from './price-calculator';
import Input from './input';
import Submit from './submit';

const StripeButton = dynamic(() => import('./stripe-button'));

import {stripeApiKey} from "../../settings";
//const BitcoinPaymentBox = dynamic(() => import('../bitcoin-button/bitcoin-button'));

// Custom form validation
const OrderSchema = Yup.object().shape({
	name: Yup.string()
		// Regex for checking full name, https://stackoverflow.com/a/45871742
		.matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, 'Please enter first/lastname'),
	phone: Yup.string()
		// Regular expression for checking Polish phone numbers, https://github.com/skotniczny/phonePL
		.matches(/^\+?(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/, 'Please enter US Phone number. Example: +1-234-555-5678'),
	total: Yup.number().positive("Please select product type and weight")

});

// https://exchange.swissx.com/?copayerId=df57b7c96d139cdbdf41c897f98d2bb54d4e80e0409d6fddf0879f0bcd95ac6f&wallet=cfe8d06b-91b7-4e4e-a35f-b0b50d0fcadf&walletName=testwallet
export const OrderPlacementForm = ({router: {query}}) => {

	const {rate, product, copayerId, wallet, walletName} = query;
	const selectedProduct = product;

	return (
		<Mutation
			mutation={CREATE_ORDER}
		>
			{(createOrder, {loading, error}) => {
				const formSubmit = async (values, {setSubmitting, resetForm}) => {
					console.log("On Submit!");
					await setSubmitting(false);

					const order = {
						variables: {
							type: values.type,
							size: values.size,
							//	dough: values.dough,
							name: values.name,
							phone: values.phone,
							time: values.time,
							city: values.city,
							street: values.street,
							paid: true,
							copayerId, wallet, walletName, rate,
							price: calculatePrice(product ? product: values.type, values.size, rate)
						}
					};

					if (! values.onlinePayment) {
						order.variables.paid = false;
					}
					console.log("Submitting): ", order);
					await createOrder(order).then(async data => {
						console.log("Order created:", data);
						const orderID = await data.data.createOrder.id;

						// https://github.com/jaredpalmer/formik-persist/issues/16
						await resetForm();
						await resetForm();

						console.debug("Redirecting to order status page....");
						// Move user to the thank you page
						return Router.push({
							pathname: '/order',
							query: {id: orderID}
						});
					}).catch(error => {
						console.error("Could not create order: ", error);
					});
				};

				return (
				<Formik
					initialValues={{
						type: '',
						size: 'Ounce (28g)',
					//	dough: '',
						name: '',
						phone: '',
						city: '',
						street: '',
						time: '',
						total: 0,
						onlinePayment: true
					}}
					//validationSchema={OrderSchema}
					onSubmit={formSubmit}
				>
					{({handleSubmit, handleChange, handleBlur, values, setFieldValue, isValid}) => {
						const total = calculateAmountToPay(product || values.type, values.size, rate);
						// const original = props.handleChange;
						// props.handleChange = (...args) => { console.log("Onchange", args, this); return original.apply(this, args); };
						return (
						<Form>
							<SelectGroup>
								{ rate && product && <h4>{product} at {rate} CHF/kg</h4>}
								{
									(! rate || ! product) && <TypeSelect value={values.type || ""} name="type" id="type" onChange={handleChange} onBlur={handleBlur} selected={selectedProduct} />
								}
								<SizeSelect value={values.size || ""} name="size" id="size" onChange={handleChange} onBlur={handleBlur}/>
								{/*<DoughSelect value={props.values.dough} onChangeText={props.handleChange('dough')}/> */}
							</SelectGroup>
							<br/>
							<Price amount={calculatePrice(product? product: values.type, values.size, rate)}/>
							<br/>

							<Input value={values.name||""} id={"name"} handleChange={handleChange} handleBlur={handleBlur} label="Full Name:" type="text" name="name" placeholder="Buyer Name" required/>
							<Input value={values.phone||""} id={"phone"} handleChange={handleChange} handleBlur={handleBlur}  label="Phone:" type="tel" name="phone" placeholder="+1-234-555-5678" required/>
							<Input value={values.street||""} id={"street"} handleChange={handleChange} handleBlur={handleBlur}  label="Address:" type="text" name="street" placeholder="Street Address" required/>
							<Input value={values.city||""} id={"city"} handleChange={handleChange} handleBlur={handleBlur}  label="City:" type="text" name="city" placeholder="City" required/>
							<br/>
							{/*<TimeSelect value={props.values.time} onChangeText={props.handleChange('time')}/> */}
							<br/>
							<input type="hidden" name="total" value={total} />
							<RadioGroup
								name="payment"
								label="Choose payment option"
								onChange={() => {
									if (values.onlinePayment === false) {
										setFieldValue('onlinePayment', true);
									} else {
										setFieldValue('onlinePayment', false);
									}
								}}
								selectedValue={values.onlinePayment === false ? 'delivery' : 'online'}
								required
							>
								{/*<Radio label="On delivery" value="delivery"/> */}
								<Radio label="Online" value="online"/>
							</RadioGroup>
							<br/>
							<Checkbox required>
    I accept your <Link href="/tos"><a>terms of service</a></Link> and <Link href="/privacy"><a>privacy policy</a></Link>.
							</Checkbox>
							<br/>
							{values.onlinePayment && stripeApiKey ?
								<StripeCheckout
									token={(token) => {
										console.info("Got stripe token:", token);
										console.log("Calling handleSubmit:", handleSubmit);
									//	debugger;
										handleSubmit(token);
									}}
									stripeKey="pk_test_hAOv1PG56mnQOmBotkCoQT3X009tKYrCqs"
									name="SwissX Order"
									label="Pay using Credit Card"
									panelLabel="Pay using Credit Card"
									amount={total}
									currency="CHF"
								>
									<StripeButton loading={loading} />
								</StripeCheckout> :
								<Submit loading={loading}/>}
							{/* props.values.onlinePayment && <BitcoinPaymentBox
								name="SwissX Order"
								label="Pay using Bitcoin"
								coin="BTC"
								amount={calculateAmountToPay(product || props.values.type, props.values.size, rate)}
								/>
							*/}
							{error && <p>Something went wrong. Try again later.</p>}
							<Persist name="order-placement-from" debounce={100} isSessionStorage/>
						</Form>
						);
					}
					}
				</Formik>
			)}}
		</Mutation>
	);
};

export default withRouter(OrderPlacementForm);
