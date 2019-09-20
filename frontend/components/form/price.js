import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
    width: 100%;
    text-align: center;
`;

const Amount = styled.p`
    font-weight: bold;
`;

const Price = ({amount, rate, size}) => (
	<Wrapper>
		<Amount>Total: {amount}  &nbsp; {rate && size? `(${rate}/kg * ${size})` : ''}</Amount>
	</Wrapper>
);

Price.propTypes = {
	amount: PropTypes.string.isRequired
};

export default Price;

