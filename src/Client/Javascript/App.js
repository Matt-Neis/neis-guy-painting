import React, { Component } from 'react';
import '../CSS/App.css';
import Toolbar from '../../Components/Toolbar/Toolbar';
import BottomBar from '../../Components/BottomBar/BottomBar';
import SideDrawer from '../../Components/SideDrawer/SideDrawer';
import Backdrop from '../../Components/Backdrop/Backdrop';
import { BrowserRouter as Router, Route} from "react-router-dom";
import Services from '../../Components/Services';
import Photos from '../../Components/Photos';
import Quotes from '../../Components/Quotes';
import Testimonials from '../../Components/Testimonials';
import Home from '../../Components/Home';
import Contact from '../../Components/Contact';

class App extends Component {
  state= {
    sideDrawerOpen: false
  }

  // handles events involving the sidedrawer button being open/closed
  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false}); // don't care about previous state of sidedrawer
  };

  render() {
    let backdrop;

    if(this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler}/>;
    }

    return (
      <Router>
        <div style={{height: "100%"}}>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler}/> {/*you can pass the handler to the toolbar which contains the button*/}
          <SideDrawer show={this.state.sideDrawerOpen}/>
          {backdrop}
          <main style={{marginTop: '64px'}}> {/* This will carry through all pages */}
            <p className="header-text">Interior/Exterior Painting, Pressure Washing, Home Maintenance Needs, Insured</p>
          </main>
          <BottomBar />
          <Route path="/home" component={Home}/>
          <Route path="/services" component={Services}/>
          <Route path="/photos" component={Photos}/>
          <Route path="/quotes" component={Quotes}/>
          <Route path="/testimonials" component={Testimonials}/>
          <Route path="/contact" component={Contact}/>
        </div>
      </Router>
    );
  }
}

export default App;
