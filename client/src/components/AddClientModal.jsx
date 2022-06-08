import { useState } from "react";//we're going to be using a form and each field will be a piece of component state
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";//will be used to update the cache


export default function AddClientModal() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const [addClient] = useMutation(ADD_CLIENT, {
        //anything we want to pass in as variables goes inside the variables object
        variables: { name, email, phone },
        //update the cache after adding a client for it to refresh in the UI
        update(cache, { data: { addClient } }) {
            //here addClient gives us what we return from the mutation
            const { clients } = cache.readQuery({ query: GET_CLIENTS });
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: [...clients, addClient] }//adding using the spread operator
                //or data: { clients: clients.concat([addClient]) }
            })//to update the cache
        }
    });

    const onSubmit = (e) =>{
        e.preventDefault();
        //console.log(name, email, phone);
        if (name === "" || email === "" || phone === "") {
            //confirming if the user has filled out all the fields
            return alert("Please fill out all fields");//if anything is missing
        }

        addClient(name, email, phone);//to add the client to the database

        //clear the form
        setName("");
        setEmail("");
        setPhone("");
    }

  return (
    <>
         {/* Button trigger modal   */}
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
          <div className="d-flex align-items-center">
             <FaUser className="icon"/> {/* adds margin on the right */}
                <div>Add Client</div>
          </div>
        </button>

         {/* Modal */}
        <div className="modal fade" id="addClientModal" aria-labelledby="addClientModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addClientModalLabel">Add Client</h5>
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
                            Email
                        </label>
                        <input type="text" className="form-control" id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Phone
                        </label>
                        <input type="text" className="form-control" id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}/>
                    </div>
                    <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit</button>
                    {/* data-bs-dismiss allows the modal to disappear after it has been submitted */}
                </form>
              </div>
            </div>
          </div>
        </div>

    
    </>
  )
}
