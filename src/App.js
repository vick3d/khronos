import React, { Component } from 'react';
import LandingPage from './landingPage';
import Navbar from './components/navbar'

class App extends Component {
  render() {
    return (
      <>
				<Navbar />
				<LandingPage />
      </>
    );
  }
}

export default App;