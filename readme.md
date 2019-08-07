# [![Ganja](media/logo/logo.svg)](https://github.com/mbikola/ganja-order.git)

> Ganja order page.

[![Build Status](https://travis-ci.org/mbikola/ganja-order.svg?branch=master)](https://travis-ci.org/mbikola/ganja-order)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)
[![Cypress.io tests](https://img.shields.io/badge/cypress.io-tests-green.svg)](https://cypress.io)

## Goal


## Docs


## Hacking

```bash
cd backend
docker-compose up -d
prisma deploy
npm install && npm start

cd ../frontend
vi settings.js
npm install && npm start
```

## Auth

login & auth powered by [auth0](https://manage.auth0.com/dashboard).  You may need auth0 clientId/secret 
to get authorization working

## Payments

Supported payment systems:
- [x] on delivery (cash only)
- [x] online/credit card using stripe (you may need stripe API credentials)
- [ ] online/credit card using paypal (you may need to specify paypal API credentials)
- [ ] online/cryptocurrency 

## Links 

- GraphQL Playground at http://localhost:4000/
- Order placement form at http://localhost:3000
- Admin dashboard at http://localhost:3000/admin (requires login)
- Prisma playground: http://localhost:4466  admin: http://localhost:4466/_admin
- see docker-compose for details
## Technology Stack

**Frontend:**

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Apollo Client](https://github.com/apollographql/apollo-client)
- [styled-components](https://www.styled-components.com/)
- [Blueprint](https://blueprintjs.com/)
- [Formik](https://jaredpalmer.com/formik/)

**Backend:**

- [Prisma](https://www.prisma.io/)
- [GraphQL](https://graphql.org/)
- [MongoDB](https://www.mongodb.com/)
- [Auth0](https://auth0.com/)

