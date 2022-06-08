//const { projects, clients } = require('../sampleData'); //dummy data
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
    GraphQLNonNull,
    GraphQLEnumType,
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


//Mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        //add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args, context, info) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();//saves the created client to the database

                //you can also use the create method
                //Client.create(args);
            }
        },
        //delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, context, info) {
                return Client.findByIdAndRemove(args.id);
            }
        },
        //add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, context, info) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });
                return project.save();
            }
        },
        //delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args, context, info) {
                return Project.findByIdAndRemove(args.id);
            }
        },
        //update project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: { 
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',//this name has to be unique
                        values: {
                            'new': { value: 'Not Started' },
                            'progress': { value: 'In Progress' },
                            'completed': { value: 'Completed' },
                        }
                    }),
                },
            },
            resolve(parent, args, context, info) {
                return Project.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        status: args.status,
                    },
                }, 
                { new: true }//if it's not there it is going to create a new project
                );
            }
        },
    },
});

//to use the query,.. it needs to be exported as a schema
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});