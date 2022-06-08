import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
//wraps around the components so that any routes will have access to the Apollo client
import Clients from "./components/Clients";
import AddClientModal from "./components/AddClientModal";
import Projects from "./components/Projects";


//solving the error: cache data may be lost, merging the changes from the server into the cache
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});


const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  //cache: new InMemoryCache(),
  cache,
});


//<> is the beginning fragment </> is the end fragment
function App() {
  return (
     <>   
      <ApolloProvider client={client}>
        <Header />
        <div className="Container">
          <AddClientModal/>
          <Projects/>
          <Clients />
        </div>
      </ApolloProvider>
    </>
  );
}

export default App;
