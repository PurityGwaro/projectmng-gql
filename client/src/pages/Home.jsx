import Clients from "../components/Clients";
import AddClientModal from "../components/AddClientModal";
import Projects from "../components/Projects";
import AddProjectModal from "../components/AddProjectModal";

export default function Home() {
  return (
    <>
        <div className="gap-3 mb-4">
        <AddClientModal/>
        <AddProjectModal/>
        <Projects/>
        <hr />
        <Clients />
        </div>
    </>
  )
}
