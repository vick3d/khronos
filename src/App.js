import React, { Component } from "react";
import { TimeTrackingTable } from "./components/timeTrackingTable";
import { Segment } from "semantic-ui-react";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import { login } from "../src/modules/kimaiService";
import Charts from "./components/charts";


class App extends Component {
	constructor(props) {
		super(props);
		const userName = localStorage.getItem("Name")
		const userPassword = localStorage.getItem("Password")

		this.state = {
			renderLoginForm: false,
			renderCharts: false,
			authorizedUser: userName && userPassword,
			userName: userName,
			userPassword: userPassword,
			message: userName && userPassword ? `Welcome, ${userName}!` : "",
			begin: '',
			end: '',
			renderTimeTrackingTable: false
		};
	}

	componentDidMount() {
		this.checkIfUser();
	}

	renderTimeTrackingTableHandler() {
		this.setState({ renderTimeTrackingtable: true })
	}

	dashboardHandler() {
		this.setState({ renderTimeTrackingtable: false })
		this.setState({ renderCharts: false })
	}

	checkIfUser() {
		if (this.state.userName != null && this.state.userPassword != null) {
			this.setState({
				authorizedUser: true
			});
		} else {
			this.setState({
				authorizedUser: false
			});
		}
	}

	authorizeUser(userName, userPassword) {
		login(userName, userPassword).then(response => {
			if (response.message === "Successfull") {
				localStorage.setItem("Name", userName);
				localStorage.setItem("Password", userPassword);
				this.setState({
					authorizedUser: true,
					userName: userName,
					userPassword: userPassword,
					message: `Welcome, ${userName}!`
				});
			} else {
				alert(response.message);
			}
		});
	}

	renderLoginForm() {
		this.setState({
			renderLoginForm: true
		});
	}

	renderCharts() {
		this.setState({
			renderCharts: true
		})
	}

	onStop(info) {
		this.setState({ begin: info.begin, end: info.end })
	}

	render() {
		let renderComponent;

		if (this.state.authorizedUser) {
			renderComponent = (
				<Dashboard
					timeTrackingHandler={this.renderTimeTrackingTableHandler.bind(this)}
					renderCharts={this.renderCharts.bind(this)}
				/>
			);

			if (this.state.renderCharts) {
				renderComponent = (
					<Charts />
				);
			} else if (this.state.renderTimeTrackingtable) {
				renderComponent = (
					<TimeTrackingTable
					 begin = {this.state.begin}
					 end = {this.state.end}
					/>
				);
			}
		} else if (this.state.renderLoginForm) {
			renderComponent = (
				<LoginForm onLogin={this.authorizeUser.bind(this)} />
			);
		} else {
			renderComponent = (
				<LandingPage renderLoginForm={this.renderLoginForm.bind(this)} />
			);
		}

		return (
			<div className="App">
				<Navbar
					isLoggedIn={this.state.authorizedUser}
					message={this.state.message}
					renderLoginForm={this.renderLoginForm.bind(this)}
					onStop={this.onStop.bind(this)}
					dashboard={this.dashboardHandler.bind(this)}
				/>
				{renderComponent}
				<Footer />
			</div>
		);
	}
}

export default App;
