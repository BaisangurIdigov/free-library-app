import React, { useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SigninPage from "./AutorizationPages/SigninPage";
import SignupPage from "./AutorizationPages/SignupPage";
import { useSelector } from "react-redux";
import Profile from "./profile/Profile";
import MyBooks from "./pages/MyBooks";
import HomePage from "./pages/HomePage";
import SearchInput from "./pages/SearchInput";
import HomeSearch from './pages/HomeSearch'
import Layout from './Layout'
import { RentedBooks } from './pages/RentedBooks';
import { Book } from '@material-ui/icons'
import BookReviews from './pages/BookReviews'
import { CircularProgress } from '@material-ui/core'



function App(props) {
  const token = useSelector((state) => state.application.token);
  const [myBooks, setMyBooks] = useState("");
  const [books, setBooks] = useState("");

  if (!token) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <SigninPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Redirect to="/signup" />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/profile">
            <div>
              <Profile />
            </div>
          </Route>

          <Route path="/" exact>
            <HomeSearch setBooks={setBooks}/>
            <HomePage values={books}/>
          </Route>

          <Route path="/MyBooks" exact>
            <SearchInput setMyBooks={setMyBooks} />
            <MyBooks myBooks={myBooks} />
          </Route>

          <Route path="/rentBook" exact>
            <RentedBooks/>
          </Route>

          <Route path="/book/:id" exact>
            <BookReviews/>
          </Route>

          <Redirect to="/" />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
