import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
//wraps around the components so that any routes will have access to the Apollo client
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";


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
        <Router>
          <Header />
          <div className="Container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
