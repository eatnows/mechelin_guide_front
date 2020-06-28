import React from "react";
import SearchResult from "components/search/SearchResult";
import SearchResultPage from "components/search/SearchResultPage";
import Axios from "util/axios";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData2: [],
    };
  }
  componentWillMount() {
    this.props.getState(false);
    console.log(this.props.search);
  }
  render() {
    return (
      <div>
        <SearchResultPage
          keyword={this.props.search}
          listData2={this.props.listData2}
        />
      </div>
    );
  }
}
export default Result;
