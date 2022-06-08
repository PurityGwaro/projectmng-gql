import { gql } from "@apollo/client";

//query for all clients
const GET_PROJECTS = gql`
    query getProjects {
        projects{
            id
            name
            description
            status
        }
    }
`;
 

export { 
    GET_PROJECTS,
 };