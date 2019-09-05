import gql from 'graphql-tag';

// Query to get a list of orders
const GET_ORDERS = gql`
	query {
		orders {
			id
			status
			paid
			price
			size
			type
			name
			phone
			time
			city
			country
			state
			zipCode
			address_line1
			address_line2
			copayerId
  			wallet 
  			walletName 
  			rate
		}
	}
`;

// Query to get information about an order using it's id
const GET_ORDER_BY_ID = gql`
	query Order($id: ID!) {
		order(id: $id) {
			id
			time
		}
	}
`;

// Mutation to create a new order
const CREATE_ORDER = gql`	
	mutation CreateOrder (
		$paid: Boolean!
		$price: String!
		$type: String!
		$size: String!
		$name: String!
		$phone: String!
		$time: String!
		 $country: String
    $state: String
    $city: String
    $zipCode: String
    $address_line1: String
    $address_line2: String
		$copayerId: String
  		$wallet: String 
  		$walletName: String 
  		$rate: String
	) {
		createOrder(
			status: "in progress"
			paid: $paid
			price: $price
			type: $type
			size: $size
			name: $name
			phone: $phone
			time: $time
			 country: $country
    state: $state
    city: $city
    zipCode: $zipCode
    address_line1: $address_line1
    address_line2: $address_line2
	    	copayerId: $copayerId
     		wallet: $wallet 
  		    walletName: $walletName 
  		    rate: $rate
		) {
			id
		}
	}
`;

// Mutation to update order status
const CHANGE_ORDER_STATUS = gql`	
	mutation UpdateOrder($status: String!, $id: ID!) {
		updateOrder(
			status: $status
			id: $id
		) {
			status
			id
		}
	}
`;

// Mutation to delete an order using it's id
const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
    }
  }
`;

export {
	GET_ORDERS,
	GET_ORDER_BY_ID,
	CREATE_ORDER,
	CHANGE_ORDER_STATUS,
	DELETE_ORDER
};
