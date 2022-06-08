import { useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

//gql-makes the query
//useQuery allows for using the query in our component and get the data as well as the loading state and errors


export default function Clients() {
    //getting the data from the getClients query
    const { loading, error, data } = useQuery(GET_CLIENTS);
    //data.clients gives the client data
    //before getting the clients we check if it's loading
    if (loading) return <Spinner />;
    //if there is an error we show it
    if (error) return <p>Something Went Wrong(</p>;

  return (
    <>
        { !loading && !error && (
            <table className="table table-hover mt-3">
                <thead>
                    <tr>
                       <th>Name</th>
                       <th>Email</th>
                       <th>Phone</th>
                       <th></th> 
                    </tr>
                </thead>
                <tbody>
                    {/* here we're going to loop through the clients which we get from data.clients */}
                    {data.clients.map(client => (
                        <ClientRow key={client.id} client={client} />
                    ))}
                </tbody>
            </table>
        ) }
    </>
  )
}
