require('dotenv').config();

const server = require('./app');
const PORT = process.env.PORT || 5000;
// console.log( process.env.STRIPE_TOKEN_URI)
server.listen(PORT, () => console.log(`server listening on ${process.env.STRIPE_TOKEN_URI}`));