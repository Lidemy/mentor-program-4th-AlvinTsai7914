import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import LoginPage from '../../pages/LoginPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';
import RegisterPage from '../../pages/RegisterPage';
import AboutPage from '../../pages/AboutPage';
import Header from '../Header';
import { AuthContext } from '../../contexts';
import { getMe } from '../../WebAPI';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const [user, setUser] = useState();

  useEffect(() => {
    if (localStorage.token) {
      getMe().then((response) => {
        if (response.ok) {
          setUser(response.data);
        }
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Root>
        <Router basename="/react-blog">
          <Header />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/post/:id">
              <PostPage />
            </Route>
            <Route path="/new-post">
              <NewPostPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
          </Switch>
        </Router>
      </Root>
    </AuthContext.Provider>
  );
}

export default App;
