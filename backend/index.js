
const {GraphQLServer} = require('graphql-yoga');
const {Prisma} = require('prisma-binding');

const notify = require('./lib/mail').createMailNotificator();
const  {FUTURE, ORDER} = require('./lib/consts');

const typeDefs = `
  type Order {
	id: ID!
	status: String!
	paid: Boolean!
	price: String!
    size: String!
    type: String!
    name: String!
    phone: String!
    country: String
    state: String
    city: String
    zipCode: String
    address_line1: String
    address_line2: String
    copayerId: String
    wallet: String
    walletName: String
    rate: String
  }

  type Future {
	id: ID!
	status: String!
	paid: Boolean!
	price: String!
    size: String!
    type: String!
    name: String!
    phone: String!
    country: String
    state: String
    city: String
    zipCode: String
    address_line1: String
    address_line2: String
    copayerId: String
    wallet: String
    walletName: String
    rate: String
  }

  type Query {
    orders: [Order!]!
    order(id: ID!): Order
    future(id: ID!): Future
    futures: [Future!]!
  }

  type Mutation {
    createOrder(
		status: String!
		paid: Boolean!
		price: String!
        size: String!
        type: String!
        name: String!
        phone: String!
         country: String
		state: String
		city: String
		zipCode: String
		address_line1: String
		address_line2: String
        copayerId: String
        wallet: String
        walletName: String 
        rate: String,
		): Order
	updateOrder(
		status: String!,
		id: ID!
	): Order
	deleteOrder(id: ID!): Order
 
    createFuture(
		status: String!
		paid: Boolean
		price: String!
        size: String!
        type: String!
        name: String!
        phone: String!
         country: String
		state: String
		city: String
		zipCode: String
		address_line1: String
		address_line2: String
        copayerId: String
        wallet: String
        walletName: String 
        rate: String,
	): Future
	updateFuture(
		status: String!,
		paid: Boolean,
		id: ID!
	): Future
	deleteFuture(id: ID!): Future
  }

`;

const resolvers = {
	Query: {
		order: (root, args, ctx, info) => ctx.prisma.query.order({where: {id: args.id}}, info),
		orders: (root, args, ctx, info) => ctx.prisma.query.orders({}, info),
		future: (root, args, ctx, info) => ctx.prisma.query.future({where: {id: args.id}}, info),
		futures: (root, args, ctx, info) => ctx.prisma.query.futures({where: {id: args.id}}, info),
	},
	Mutation: {
		createOrder: (root, args, ctx, info) => {

			//const {copayerId, wallet, walletName, rate} = args;
			return ctx.prisma.mutation.createOrder({
				data: {
				...args
				}
			}, info).then((order) => {
				const {id, __typename} = order;
				notify(__typename, {...args, id});
				return order;
			}).catch(err => {
				console.error(err);
				throw err;
			});
		},
		createFuture: (root, args, ctx, info) => {
			//const {copayerId, wallet, walletName, rate} = args;
			return ctx.prisma.mutation.createFuture({
				data: {
					...args
				}
			}, info).then( (future) => {
				const {id, __typename} = future;
				notify(__typename, {...args, id});
				return future;
			});
		},
		updateOrder: (root, args, ctx, info) =>
			ctx.prisma.mutation.updateOrder({data: {status: args.status}, where: {id: args.id}}, info),
		deleteOrder: (root, args, ctx, info) =>
			ctx.prisma.mutation.deleteOrder({where: {id: args.id}}, info)
	}
};

const server = new GraphQLServer({
	typeDefs,
	resolvers,
	context: req => ({
		...req,
		prisma: new Prisma({
			typeDefs: './schema.graphql',
			endpoint: 'http://localhost:4466',
			debug: true
		})
	})
});

server.start(() => console.log('Server is running on http://localhost:4000'));
