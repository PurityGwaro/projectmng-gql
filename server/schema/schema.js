const { projects, clients } = require('../sampleData'); 
//const graphql = require('graphql');
//anything we need from graphql we are going to destructure it

//bring in the mongoose models
const Project = require('../models/Project');
const Client = require('../models/Client');
//these can be used to query the database

const { 
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
 } = require('graphql');

 //grqphql object type is used when creating each type of the major categories i.e client type and projects type

 //client type object
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});

//project type object
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        //adding relationships to different types
        client: { //child to the Project(parent in this case)
            type: ClientType,
            resolve(parent,args,context,info){
                //return clients.find(client => client.id === parent.clientId);
                return Client.findById(parent.clientId);
            }
         },  
    }),
});

//create the root query object
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    //it's going to be an object for it's fields instead of a function
    fields: {
        client: {//going to fetch a client by id
            type: ClientType,
            args: {
                id: { type: GraphQLID },
            },
            //what we return is going to be in the resolver
            resolve(parent, args, context, info) {
                //return clients.find(client => client.id === args.id);
                //access db
                return Client.findById(args.id);
            }
        },
        clients: {//going to fetch all the clients
            //it is a list of client types
            type: new GraphQLList(ClientType),
            //args: {} are not needed coz we're getting all clients
            resolve(parent, args, context, info) {
               //return clients; //returning the array of clients
               //access db
               return Client.find();
            }
        },
        project: {//going to fetch a project by id
            type: ProjectType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args, context, info) {
                //return projects.find(project => project.id === args.id);
                //access db
                return Project.findById(args.id);
            }
        },
        projects: {//going to fetch all the projects
            type: new GraphQLList(ProjectType),
            resolve(parent, args, context, info) {
                //return projects;
                //access the database and return all the projects
                return Project.find();//this gets all the projects
            }
        },
    },
});

//to use the query,.. it needs to be exported as a schema
module.exports = new GraphQLSchema({
    query: RootQuery,
});