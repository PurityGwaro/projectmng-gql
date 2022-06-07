const express = require('express');
require ('dotenv').config();
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;
//will look into the enviroment variable for the PORT and if it doesn't find a value it runs at 5000
const { graphqlHTTP } = require('express-graphql');

//initialize express
const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
    //if we are in development then set graphiql to true
}));

app.listen(port, console.log(`Server is running on port ${port}`));

