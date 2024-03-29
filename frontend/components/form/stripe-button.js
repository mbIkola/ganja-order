import React from 'react';
import styled from 'styled-components';
import {Button} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const Wrapper = ({className, loading, disabled}) => (
	<div className={className}>
		<Button
			type="button"
			loading={loading}
			disabled={disabled}
		>
Pay using Credit Card
		</Button>
	</div>
);

const StripeButton = styled(Wrapper)`
    .bp3-button {
        width: 100%;
		user-select: none;
    }
`;

StripeButton.propTypes = {
	className: PropTypes.string,
	loading: PropTypes.bool.isRequired
};

export default StripeButton;
