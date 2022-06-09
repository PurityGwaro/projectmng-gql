import { useState } from "react";//we're going to be using a form and each field will be a piece of component state
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";//will be used to update the cache
import { GET_CLIENTS } from "../queries/clientQueries";
import { ADD_PROJECT } from "../mutations/projectMutations";



export default function AddProjectModal() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [clientId, setClientId] = useState("");
    const [status, setStatus] = useState("new");

    const [addProject] = useMutation(ADD_PROJECT, {
      variables: { name, description, clientId, status },
      //update the cache
      update(cache, { data: { addProject } }) {
        const { projects } = cache.readQuery({ query: GET_PROJECTS });
        cache.writeQuery({
          query: GET_PROJECTS,
          //data: { projects: projects.concat([addProject]) } or
          data: { projects: [...projects, addProject] }

        });
      }
    });
 
    //get clients for select
    const { loading, error, data } = useQuery(GET_CLIENTS);


    const onSubmit = (e) =>{
        e.preventDefault();
       
        if (name === "" || description === "" || status === "") {
            //confirming if the user has filled out all the fields
            return alert("Please fill out all fields");//if anything is missing
        }

        addProject(name, description, clientId, status);

        //clear the form
        setName("");
        setDescription("");
        setClientId("");
        setStatus("new");
    }

    if(loading) return null;
    if(error) return 'Something went wrong';

  return (
    <>
      { !loading && !error && (
        <>
           {/* Button trigger modal   */}
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
          <div className="d-flex align-items-center">
             <FaList className="icon"/> {/* adds margin on the right */}
                <div>New Project</div>
          </div>
        </button>

         {/* Modal */}
        <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addProjectModalLabel">New Project</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                {/* form goes here */}
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className="form-label">
                            Name
                        </label>
                        <input type="text" className="form-control" id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>
                        <textarea className="form-control" id="description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}>

                        </textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Status
                        </label>
                        <select className="form-select" id="status" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="new">Not Started</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                          Client
                        </label>
                        <select className="form-select" id="clientId" value={clientId} onChange={e => setClientId(e.target.value)}>
                          <option value=''>Select Client</option>
                          {data.clients.map(client => (
                            <option key={client.id} value={client.id}>
                              {client.name}
                            </option>
                          ))}
                        </select>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-primary">Submit</button>
                    {/* data-bs-dismiss allows the modal to disappear after it has been submitted */}
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      ) }
    </>
  )
}
