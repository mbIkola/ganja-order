import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';
/*
		'Eighth (3.5g)': 30,
		'Quarter (7g)': 55,
		'Half Ounce (14g)': 105,
		'Ounce (28g)': 200
 */
const Wrapper = ({className}) => (
	<Label className={className}>
    Weight:
		<div className="bp3-select">
			<FastField name="size" component="select" placeholder="Weight" required>
				<option value="">Select</option>
				<option value="Eighth (3.5g)">Eighth (3.5g)</option>
				<option value="Quarter (7g)">Quarter (7g)</option>
				<option value="Half Ounce (14g)">Half Ounce (14g)</option>
				<option value="Ounce (28g)">Ounce (28g)</option>
			</FastField>
		</div>
	</Label>
);

export const SizeSelect = styled(Wrapper)`
    width: 11rem;
	user-select: none;
`;

SizeSelect.propTypes = {
	className: PropTypes.string
};

export default SizeSelect;
