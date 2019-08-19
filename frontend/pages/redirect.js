import {useEffect} from 'react';
import Router from 'next/router';
import {parseHash} from '../static/auth/auth0';
import {saveToken, verifyToken} from '../static/auth/auth';

// Redirect user after login
export default () => {
	useEffect(() => {
		parseHash(async (err, result) => {
			if (err) {
				console.error('Error signing in', err);
				Router.push('/admin');
			} else {
				await verifyToken(result.idToken).then(valid => {
					if (valid) {
						saveToken(result.idToken, result.accessToken);
						Router.push('/admin');
					} else {
						Router.push('/');
					}
				});
			}
		});
	}, []);

	return null;
};
