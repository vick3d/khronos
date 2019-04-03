import React, { Component } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/navbar'
import LoginForm from './components/loginForm'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      renderLoginForm: false
    }  
  }

  renderLoginForm(){
    console.log("i got clicked");
    this.setState({
      renderLoginForm: true
    })
  }
  render() {
    let renderComponent;
    if (this.state.renderLoginForm){
      renderComponent = <LoginForm />
    } else {
      renderComponent = (<LandingPage renderLoginForm={this.renderLoginForm.bind(this)} />)
    }

    return (
      <>
				<Navbar />
        {renderComponent}
      </>
    );
  }
}

export default App;