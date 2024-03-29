import React from 'react';
import Document, {Head, Main, NextScript} from 'next/document';
import {createGlobalStyle, ServerStyleSheet} from 'styled-components';

// Fonts
import MontserratWoff from '../static/fonts/montserrat-v12-latin-ext-regular.woff';
import MontserratWoff2 from '../static/fonts/montserrat-v12-latin-ext-regular.woff2';

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-display: fallback;
		src: local('Montserrat Regular'), local('Montserrat-Regular'),
			url(${MontserratWoff2}) format('woff2'),
			url(${MontserratWoff}) format('woff');
  	}
	  
	body {
		font-family: Montserrat, Georgia, monospace;
		background: #fff;
		word-wrap: break-word;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeSpeed;
	}
`;

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;

		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props}/>)
				});

			const initialProps = await Document.getInitialProps(ctx);
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<html lang="en">
				<Head>
					<meta charSet="utf-8"/>
					<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
					<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
					<meta name="description" content="SwissX Order"/>
					<meta name="image" content="https://cdn.shopify.com/s/files/1/1820/8835/files/SWISSX-LOGO-MAIN_450x.png?v=1493741277"/>
					<meta name="theme-color" content="#212121"/>
					<meta name="msapplication-TileColor" content="#212121"/>
					<meta name="og:title" content="SwissX Order"/>
					<meta name="og:description" content="SwissX Order"/>
					<meta name="og:image" content="https://cdn.shopify.com/s/files/1/1820/8835/files/SWISSX-LOGO-MAIN_450x.png?v=1493741277"/>
					<meta name="og:url" content=""/>
					<meta name="og:site_name" content="SwissX Order"/>
					<meta name="og:type" content="website"/>
					<script
						src="https://www.paypal.com/sdk/js?client-id=SB_CLIENT_ID">
					</script>
					<link rel="icon" href="static/favicon.svg"/>
				</Head>
				<body>
					<Main/>
					<NextScript/>
					<GlobalStyle/>
				</body>
			</html>
		);
	}
}
