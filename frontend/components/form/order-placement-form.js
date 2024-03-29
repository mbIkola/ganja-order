import React from 'react';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {Checkbox, Radio, RadioGroup} from '@blueprintjs/core';
import {Formik, Form} from 'formik';
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

import {stripeApiKey, allowCreditCard} from "../../settings";
import RegionInput from "./region";
import CountryInput from "./country";
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
							...values,
							time: "" + (+new Date()),
							paid: true,
							copayerId, wallet, walletName, rate,
							price: calculatePrice(product ? product: values.type, values.size, rate)
						}
					};

					if (! values.onlinePayment || ! allowCreditCard) {
						order.variables.paid = false;
					}
					await createOrder(order).then(async data => {
						const orderID = await data.data.createOrder.id;
						await resetForm();
						await resetForm();

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

							<Input value={values.name||""} id={"name"} handleChange={handleChange} handleBlur={handleBlur} label="Full Name:" autoComplete="name" type="text" name="name" placeholder="Buyer Name" required/>
							<Input value={values.phone||""} id={"phone"} handleChange={handleChange} handleBlur={handleBlur}  label="Phone:" autoComplete="tel" type="tel" name="phone" placeholder="+1-234-555-5678" required/>
							<CountryInput value={values.country||""} id={"country"} handleChange={handleChange}   label="Country:" priorityOptions={["CA", "US", "GB"]} type="text" autoComplete="country" name="country" placeholder="country" required/>
							<RegionInput value={values.state||""} id={"state"}  country={values.country} handleChange={handleChange}   label="State:" type="text" name="state" autoComplete="address-level1" placeholder="State / Province" required/>
							<Input value={values.city||""} id={"city"} handleChange={handleChange} handleBlur={handleBlur}  label="City:" type="text" name="city" autoComplete="city" placeholder="City" required/>
							<Input value={values.zipCode||""} id={"zipCode"} handleChange={handleChange} handleBlur={handleBlur}  label="zipCode" type="text" autoComplete="postal-code" name="zipCode" placeholder="zipCode" required/>
							<Input value={values.address_line1||""} id={"address1"} handleChange={handleChange} handleBlur={handleBlur}  label="Address Line 1:" autoComplete="street-address" type="text" name="address_line1" placeholder="Street address or PO box" required/>
							<Input value={values.address_line2||""} id={"address_line2"} handleChange={handleChange} handleBlur={handleBlur}  label="Address Line 2:"  autoComplete="address-line2" type="text" name="address_line2" placeholder="Appartment/Suite number, unit, building, floor, etc" required/>
							<br/>
							{/*<TimeSelect value={props.values.time} onChangeText={props.handleChange('time')}/> */}
							<br/>
							<input type="hidden" name="total" value={total} />

							{
								allowCreditCard && <RadioGroup
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
							}
							<br/>
							<Checkbox required>
    I accept your <Link href="/tos"><a>terms of service</a></Link> and <Link href="/privacy"><a>privacy policy</a></Link>.
							</Checkbox>
							<br/>
							{allowCreditCard && values.onlinePayment && stripeApiKey ?
								<StripeCheckout
									token={(token) => {
										console.info("Got stripe token:", token);
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
								<Submit loading={loading}/>
							/* end of allowCreditCard */
							}

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
