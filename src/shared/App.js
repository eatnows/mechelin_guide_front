import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "components/signup/SignUp";
import Login from "components/login/Login";
import Welcome from "components/signup/Welcome";
import Main from "components/main/Main";
import FAQ from "components/customer_center/FAQ";
import QnA from "components/customer_center/QnA";
import MyPage from "components/mypage/MyPage";
import WishList from "components/mypage/WishList";
import NewsFeed from "components/post/NewsFeed";
import Review from "components/post/Review";
import ReviewAdd from "components/post/ReviewAdd";
import Timeline from "components/post/Timeline";
import Result from "components/search/Result";

import "components/css/allStyle.css";
import { ReviewAdd } from "pages";

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={Main} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/welcome" component={Welcome} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/qna" component={QnA} />
        <Route exact path="/mypage" component={MyPage} />
        <Route exact path="/wishlist" component={WishList} />
        <Route exact path="/newsfeed" component={NewsFeed} />
        <Route exact path="/review" component={Review} />
        <Route exact path="/reviewadd" component={ReviewAdd} />
        <Route exact path="/timeline" component={Timeline} />
        <Route exact path="/result" component={Result} />
      </div>
    );
  }
}

export default App;
