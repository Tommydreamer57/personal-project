import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Login from './components/pages/Login/Login';
import Home from './components/pages/Home/Home';
import Section from './components/pages/Section/Section';
import Post from './components/pages/Post/Post';
import AdminHome from './components/admin/AdminHome/AdminHome';
import EditPost from './components/admin/EditPost/EditPost';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <div className='main'>
            <Switch>
              {/* <Route exact path='/' component={Login} /> */}
              <Route exact path='/' component={Home} /> {/*CHANGE PATH TO /HOME/ AND REMOVE EXACT*/}
              <Route path='/home/' component={Home} /> {/*REMOVE LATER*/}
              <Route path='/section/' component={Section} /> {/*ADD PARAM :/SECTION TO PATH*/}
              <Route path='/post/' component={Post} /> {/*ADD PARAM :/POST TO PATH*/}
              <Route exact path='/admin/' component={AdminHome} />
              <Route path='/admin/edit/:post' component={EditPost} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
