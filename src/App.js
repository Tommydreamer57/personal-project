import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import logo from './logo.svg';
import './reset.css';
import './App.css';
import Login from './components/pages/Login/Login';
import Home from './components/pages/Home/Home';
import Section from './components/pages/Section/Section';
import Post from './components/pages/Post/Post';
import AdminHome from './components/admin/AdminHome/AdminHome';
import CreatePost from './components/admin/CreatePost/CreatePost';
import SlateEditor from './components/admin/SlateEditor/SlateEditor';
import EditPost from './components/admin/EditPost/EditPost';
import Users from './components/admin/Users/Users';
import Favorites from './components/pages/Favorites/Favorites';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <div className='main'>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/section/:section' component={Section} />
            <Route path='/posts/:postid' component={Post} />
            <Route exact path='/admin/' component={AdminHome} />
            <Route path='/admin/createpost' component={CreatePost} />
            <Route path='/admin/editpost/:postid' component={SlateEditor} />
            {/* <Route path='/admin/users' component={Users} /> */}
            <Route path='/favorites' component={Favorites} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
