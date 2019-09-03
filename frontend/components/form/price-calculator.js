import prices, {sizes} from './prices';

// Calculate price and display it to user in a friendly format
const calculatePrice = (type, size, rate) => {
	if (!type || !size /*|| !dough*/) {
		console.log("type/size not selected", type, size);
		return '0.00 CHF';
	}

	const price = rate ? rate * sizes[size] : prices[type][size];

	// if (dough === 'Thick') {
	// 	return `${price + 3}.00 CHF`;
	// }

	if ( ! price )  {
		return '0.00 CHF';
	}
	return `${calculateAmountToPay(type, size, rate)} CHF`;

//	return `${Number(price).toFixed(2)*1} CHF`;
};

// Calculate the amount a user has to pay
const calculateAmountToPay = (type, size, rate) => {
	if (!type || !size) {
		console.log("nothing to calc, type or size is not set", type, size);
		//debugger;
		return 0;
	}

	const price = rate ? rate * sizes[size] : prices[type][size];

	if ( ! price )  {
		return 0;
	}

	const res =  Number(price * 100).toFixed(2)*1;

	console.log(`Amount to pay:${res} cuz rate=${rate} and size=${size}`);
	return res;
};

export {
	calculatePrice,
	calculateAmountToPay
};
