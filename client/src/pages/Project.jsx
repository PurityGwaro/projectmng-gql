import { Link, useParams } from "react-router-dom";
//useParams is a hook that returns an object with a key called params, which contains the params of the URL
//we need to be able to get the id from the URL
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import ClientInfo from "../components/ClientInfo";
import DeleteProjectButton from "../components/DeleteProjectButton";
import EditProjectForm from "../components/EditProjectForm";

export default function Project() {   
    const [showForm, setShowForm] = useState(false);
    //get the id
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, 
        { variables: { id } }
        );
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;


  return (
    <>
        { !loading && !error && (
            <div className="mx-auto w-75 card p-5">
                <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
                <h1 className="text-center">{data.project.name}</h1>
                <p>{data.project.description}</p>
                <h5 className="mt-3">Project Status: </h5>
                <p className="lead">{ data.project.status }</p>
                <ClientInfo client={data.project.client}/>
                <button 
                className="btn btn-danger mt-5" 
                onClick={()=> setShowForm((showForm) =>!showForm )}>
                Update Project Details</button>
                {showForm && <EditProjectForm project={data.project} setShowForm={setShowForm}/>}
                <DeleteProjectButton projectId={data.project.id}/> 
            </div>
        )}
    </>
  )
}
