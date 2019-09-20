import React, {useState, useRef} from 'react';
import {withRouter} from 'next/router';
import Link from 'next/link';
import {createGlobalStyle} from 'styled-components';
import {Button, Card, Elevation, Spinner} from '@blueprintjs/core';
import {Query} from 'react-apollo';

import Container from '../components/form/container';

import {GET_FUTURE_BY_ID} from '../components/api';

const GlobalStyle = createGlobalStyle`
	body {
		background-image: url("https://cdn.shopify.com/s/files/1/1820/8835/files/SWISSX-LOGO-MAIN_450x.png?v=1493741277");
		background-size:  64px;
		background-repeat: no-repeat;
	}
`;

const Future = ({router: {query}}) => {
    const [copySuccess, setCopySuccess] = useState('');
    const inputEl = useRef(null);

    if (!query.id) {
        return <p>Order id not provided</p>;
    }

    const shortId = query.id.replace(/"/g, '').slice(18);
    const {id} = query;

    const copyToClipboard = () => {
        inputEl.current.select();
        document.execCommand('copy');

        setCopySuccess('Copied!');
    };

    return (
        <Container style={{textAlign: 'center'}}>
            <Card elevation={Elevation.FOUR}>
                <Query query={GET_FUTURE_BY_ID} variables={{id}}>
                    {({loading, error, data}) => {
                        if (loading) {
                            return <Spinner/>;
                        }

                        if (error) {
                            return <p>Order not found or it&apos;s id is invalid</p>;
                        }

                        return (
                            <>
                                <h1 style={{fontSize: '3rem'}} className="thanks">Thank you!</h1>
                                <br/>
                                <p>Your Order number is:</p>
                                <br/>
                                <div style={{width: '12em', margin: 'auto'}} className="bp3-input-group">
                                    <input ref={inputEl} className="bp3-input" value={shortId} readOnly/>
                                    <Button className="bp3-button bp3-minimal bp3-intent-primary bp3-icon-clipboard" onClick={copyToClipboard}/>
                                    {copySuccess}
                                </div>
                                <br/>
                                <h4 style={{fontSize: '1.2rem'}}>Your Sell Order will be processed ASAP </h4>
                                { /* {data.Future.time === 'ASAP' ? 'in about an hour' : `at ${data.Future.time}`}</h4> */}
                                <br/>
                                <br/>
                                <p>If you won&apos;t receive callback from our manager soon, please call us:<br/>
                                    <strong><a type="tel" href="tel:+1 234 567 890"> +1 234 567 890 </a></strong>
                                </p>
                                <br/>
                                <Link prefetch href="/sell">
                                    <Button>Sell another product!</Button>
                                </Link>
                            </>
                        );
                    }}
                </Query>
            </Card>
            <GlobalStyle/>
        </Container>
    );
};

export default withRouter(Future);
