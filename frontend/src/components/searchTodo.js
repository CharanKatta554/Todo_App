import React from "react";
import * as SwiftypeAppSearch from "swiftype-app-search-javascript";
const client = SwiftypeAppSearch.createClient({
    hostIdentifier: process.env.REACT_APP_HOST_IDENTIFIER,
    apiKey: process.env.REACT_APP_SEARCH_KEY,
    engineName: "node-modules"
  });
class SearchTodo extends Component {
    state = {
      response: null
    };
    componentDidMount() {
      this.performQuery("foo");
    }
    
    performQuery = queryString => {
      client.search(queryString, {}).then(
        response => {
          console.log(response);
          this.setState({ response });
        },
        error => {
          console.log(`error: ${error}`);
        }
      );
    };
    render() {
      const {response} = this.state;
      if (!response) return null;
      return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Node Module Search</h1>
          </header>
          <h2>{response.info.meta.page.total_results} Results</h2>
          {response.results.map(result => (
            <div key={result.getRaw("id")}>
              <p>Name: {result.getRaw("name")}</p>
              <p>Description: {result.getRaw("description")}</p>
            </div>
          ))}
        </div>
      );
    }
  }
  