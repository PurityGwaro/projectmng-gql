const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name: { 
        type: String 
    },  
    description: {
         type: String 
        },
    status: {
         type: String,
         enum: ['Not Started', 'In Progress', 'Completed']
        },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,//it should relate to another model:client model
        ref: 'Client',//defiing the other model related to
        //clientId should partain to the id of the client model
    },
});

module.exports = mongoose.model('Project', ProjectSchema);