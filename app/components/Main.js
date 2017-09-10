// Include React
var React = require("react");

// Here we include all of the sub-components
var Search = require("./children/Search");
var Results = require("./children/Results");

// Helper for making AJAX requests to our API
var helpers = require("./utils/helpers");

// Creating the Main component
var Main = React.createClass({

  // Here we set a generic state associated with the number of clicks
  // Note how we added in this history state variable
  getInitialState: function() {
    return { searchTerm: "", results: ""};
  },

  // If the component changes (i.e. if a search is entered)...
  componentDidUpdate: function() {
    console.log("I am in componentDidUpdate");
    // Run the query for the address
    helpers.runQuery(this.state.searchTerm).then(function(data) {
      console.log("My helper runquery is complete, results are below");
      if (data !== this.state.results) {
        console.log("Articles", data);
        this.setState({ results: data });

      }
    }.bind(this));
  },
  // This function allows childrens to update the parent.
  setTerm: function(term) {
    this.setState({ searchTerm: term });
  },
  // Here we render the function
  render: function() {
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron">
            <h2 className="text-center">New York Times Article Search</h2>
            <p className="text-center">
              <em>Enter a search for the types of articles you would like to see (Example: dogs).</em>
            </p>
          </div>

          <div className="col-md-6">

            <Search setTerm={this.setTerm} />

          </div>

          <div className="col-md-6">

            <Results article={this.state.results} />

          </div>

        </div>
        
      </div>
    );
  }
});

// Export the component back for use in other files
module.exports = Main;
