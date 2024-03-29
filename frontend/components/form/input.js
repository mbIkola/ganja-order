import React from 'react';
import styled from 'styled-components';
import {ErrorMessage, FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Input = ({className, label, type, name, placeholder, required, value, handleChange, handleBlur}) => (
	<Label className={className}>
		{label}
		<FastField style={{width: '100%'}} className="bp3-input" type={type} name={name} placeholder={placeholder} required={required} value={value}
			   onChange={handleChange} onBlur={handleBlur}
		/>
		<ErrorMessage name={name} component="div"/>
	</Label>
);

//
// export const Input = styled(Wrapper)`
//     .bp3-input {
//         width: 100%;
// 		user-select: none;
//     }
// `;

Input.propTypes = {
	className: PropTypes.string,
	label: PropTypes.string,
	type: PropTypes.string,
	name: PropTypes.string,
	placeholder: PropTypes.string,
	required: PropTypes.bool.isRequired
};

export default Input;
