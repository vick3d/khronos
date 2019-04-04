import React, { Component } from 'react';
import LandingPage from './components/landingPage';
import Navbar from './components/navbar'
import LoginForm from './components/loginForm'
import Footer from './components/footer';
import { login } from './kimaiService';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
			renderLoginForm: false,
			authorizedUser: false,
			userName: null,
			userPassword: null
    }
	}

  authorizeUser(userName, userPassword){
		login(userName, userPassword).then( () => {
			this.setState({
				authorizedUser: true,
				userName: userName,
				userPassword: userPassword
			})
		})
	}

  renderLoginForm(){
    this.setState({
			renderLoginForm: true
    })
	}

  render() {
    let renderComponent;

		if (this.state.authorizedUser) {
			renderComponent = (<LandingPage authorizedUser={true} />)
		} else if (this.state.renderLoginForm) {
			renderComponent = <LoginForm onLogin={this.authorizeUser.bind(this)} />
		} else {
			renderComponent = <LandingPage renderLoginForm={this.renderLoginForm.bind(this)} />
		}

    return (
      <>
				<Navbar isLoggedIn={this.state.authorizedUser} />
        {renderComponent}
				<Footer />
      </>
    );
  }
}

export default App;