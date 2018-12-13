import React from 'react';
import ReactDOM from 'react-dom';
import './Client/CSS/index.css';
import App from './Client/Javascript/App.js';
import * as serviceWorker from './Client/Javascript/serviceWorker.js';
import {Router, Route} from 'react-router';
import Toolbar from './Components/Toolbar/Toolbar';

/*class App extends Component {
    render() {
      return (
        <div className="App">
          <Toolbar/>
          <main style={{marginTop: '64px'}}>
            <p className="header-text">Interior/Exterior Painting, Pressure Washing, Home Maintenance Needs, Insured</p>
          </main>
        </div>
      );
    }
  } */

  /*class Router extends React.Component {
      render() {
          return (
            <Router>

            </Router>
          );
      }
  }*/

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
