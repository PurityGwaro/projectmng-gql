import { gql } from "@apollo/client";

//query for all clients
const GET_CLIENTS = gql`
    query getClients {
        clients{
            id
            name
            email
            phone
        }
    }
`;
 

export { 
    GET_CLIENTS,
 };