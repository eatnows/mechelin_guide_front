import React from "react";
import SearchResult from "components/search/SearchResult";
import SearchResultPage from "components/search/SearchResultPage";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    this.props.getState(false);
    console.log(this.props.search);
  }
  render() {
    return (
      <div>
        <SearchResultPage keyword={this.props.search} />
      </div>
    );
  }
}
export default Result;
