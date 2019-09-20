import React from 'react';
import dynamic from 'next/dynamic';
import {createGlobalStyle} from 'styled-components';
import {Card, Elevation} from '@blueprintjs/core';

import Container from '../components/form/container';
import Footer from '../components/form/footer';

const FuturePlacementForm = dynamic(() => import('../components/form/futures-placement-form'));

const GlobalStyle = createGlobalStyle`
	body {
		background-image: url("https://cdn.shopify.com/s/files/1/1820/8835/files/SWISSX-LOGO-MAIN_450x.png?v=1493741277");
		background-size:  64px;
		background-repeat: no-repeat;
	}
`;

const Sell = () => {
    return (
        <Container>
            <Card elevation={Elevation.FOUR}>
                <FuturePlacementForm/>
                <Footer>
                    <br/>
                    <p>Powered by SwissX</p>
                </Footer>
            </Card>
            <GlobalStyle/>
        </Container>
    );
};

export default Sell;
