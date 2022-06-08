import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id: client.id },//to know which client to delete
    //refetchQueries: [{ query: GET_CLIENTS }]//to refresh the clients after deleting..another way is to update the cache(this is recommended)
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });//reads the query from the cache instead of creating a new one
      cache.writeQuery({//writes the query to the cache
        query: GET_CLIENTS,
        data: { clients: clients.filter(c => c.id !== deleteClient.id) }
      })//to update the cache
    }//to refresh the clients after deleting
  });

  return (
    <tr>
        <td>{ client.name }</td>
        <td>{ client.email }</td>
        <td>{ client.phone }</td>
        <td>
            <button className="btn btn-danger btn-sm" onClick={deleteClient}>
                <FaTrash />
            </button>
        </td>
    </tr>
  )
}
