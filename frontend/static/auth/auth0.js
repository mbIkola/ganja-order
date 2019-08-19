import auth0 from 'auth0-js';
import {auth0clientID, auth0domain, domain} from '../../settings';

// Authenticate to Auth0
const webAuth = (clientID, domain) => {
	return new auth0.WebAuth({
		clientID,
		domain
	});
};

// Login
const login = () => {
	const options = {
		responseType: 'id_token',
		redirectUri: `http://${domain}/redirect`,
		scope: 'openid profile email'
	};

	return webAuth(auth0clientID, auth0domain).authorize(options);
};

const parseHash = cb => {
	return webAuth(auth0clientID, auth0domain).parseHash(cb);
};

const logout = () => {
	return webAuth(auth0clientID, auth0domain).logout({returnTo: `http://${domain}`});
};

export {
	login,
	parseHash,
	logout
};
