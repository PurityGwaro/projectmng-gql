//creating mongoose models by creating a mongoose schema
//these will include the fields for our database collections
//then on top of that we create our gql API
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

module.exports = mongoose.model('Client', ClientSchema);