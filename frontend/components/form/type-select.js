import React from 'react';
import styled from 'styled-components';
import {FastField} from 'formik';
import {Label} from '@blueprintjs/core';
import PropTypes from 'prop-types';

import {prices} from "./prices";

const Wrapper = ({className}) => (
	<Label className={className}>
Product Type:
		<div className="bp3-select">
			<FastField name="type" component="select" placeholder="Product Type" required>
				<option value="">Select</option>
				{Object.keys(prices).map( item => <option key={item} value={item}>{item}</option>)}
			</FastField>
		</div>
	</Label>
);

const TypeSelect = styled(Wrapper)`
    width: 11rem;
	user-select: none;
`;

TypeSelect.propTypes = {
	className: PropTypes.string
};

export default TypeSelect;
