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
      <div style={{ overflow: "auto", height: "100vh" }}>
        <caption
          style={{
            fontWeight: "bold",
            fontSize: "1.5vw",
            width: "10vw",
            marginTop: "5vw",
            color: "rgba(245,145,45)",
            marginLeft: "25vw",
          }}
        >
          검색 결과{" "}
        </caption>

        <SearchResultPage
          keyword={this.props.search}
          listData2={this.props.listData2}
          reivewPageMove={this.props.reivewPageMove}
          history={this.props.history}
        />
      </div>
    );
  }
}
export default Result;
