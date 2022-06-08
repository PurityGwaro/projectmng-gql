import Spinner from "./Spinner"
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    //to get the projects
    //useQuery is the query we want to get our data from, connects us to GET_PROJECTS where we defined the query
    const { loading, error, data } = useQuery(GET_PROJECTS);

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;


  return (
    <>
    {/* first confirm if there are some projects before mapping through them */}
    { data.projects.length > 0 ? (
        <div className="row mt-4">
            {/* here we are going to map through our projects */}
            {data.projects.map(project => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    ) : <p>No Projects</p> }
    </>
  )
}
