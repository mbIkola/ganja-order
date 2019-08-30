import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';
import {sizes} from "./prices";
import uniq from 'lodash/fp/uniq';

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
				{ Object.keys(sizes).map( size => <option key={size} value={size}>{size}</option>)}
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
