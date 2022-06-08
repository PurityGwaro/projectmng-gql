import { Link, useParams } from "react-router-dom";
//useParams is a hook that returns an object with a key called params, which contains the params of the URL
//we need to be able to get the id from the URL
import Spinner from "../components/Spinner";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";

export default function Project() {
    //get the id
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, 
        { variables: { id } }
        );
    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

  return (
    <div>Project</div>
  )
}
