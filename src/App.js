import React, { Component } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/navbar'
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <>
				<Navbar />
				<LandingPage />
				<Footer />
      </>
    );
  }
}

export default App;