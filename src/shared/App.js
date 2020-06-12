import React, { Component } from "react";
import { Route } from "react-router-dom";
import SignUp from "pages/signup/SignUp";
import Login from "pages/login/Login";
import Welcome from "pages/signup/Welcome";
import Main from "pages/main/Main";
import FAQ from "pages/customer_center/FAQ";
import QnA from "pages/customer_center/QnA";
import MyPage from "pages/mypage/MyPage";
import WishList from "pages/mypage/WishList";
import NewsFeed from "pages/post/NewsFeed";
import Review from "pages/post/Review";
import ReviewAdd from "pages/post/ReviewAdd";
import Timeline from "pages/post/Timeline";
import Result from "pages/search/Result";

import "components/css/allStyle.css";

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
