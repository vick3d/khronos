import React, { Component } from "react";
import { TimeTrackingTable } from "./components/timeTrackingTable";
import LandingPage from "./components/landingPage";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import Footer from "./components/footer";
import Dashboard from "./components/dashboard";
import Invoicing from "./components/invoicing";
import { login } from "../src/modules/kimaiService";
import Charts from "./components/charts";

class App extends Component {
	constructor(props) {
		super(props);
		const userName = localStorage.getItem("Name");
		const userPassword = localStorage.getItem("Password");

		this.state = {
			renderLoginForm: false,
			renderCharts: false,
			authorizedUser: userName && userPassword,
			userName: userName,
			userPassword: userPassword,
			message: userName && userPassword ? `Welcome, ${userName}!` : "",
			renderTimeTrackingTable: false,
			renderInvoicing: false,
			fetchAllCustomers: [],
			begin: "",
			end: "",
			renderTimeTrackingTable: false
		};
	}

	componentDidMount() {
		this.checkIfUser();
	}

	renderTimeTrackingTableHandler() {
		this.setState({ renderTimeTrackingtable: true });
	}

	renderInvoicingHandler() {
		this.setState({renderInvoicing: true})
	}

	dashboardHandler() {
		this.setState({renderTimeTrackingtable: false, renderInvoicing: false, renderCharts: false})
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
		});
	}

	onStop(info) {
		this.setState({ begin: info.begin, end: info.end });
	}

	render() {
		let renderComponent;

		if (this.state.authorizedUser) {
			if (this.state.renderCharts) {
				renderComponent = (
					<Charts />
				);
			} else if (this.state.renderInvoicing) {
				renderComponent = (
					<Invoicing
					/>
				);
			} else if (this.state.renderTimeTrackingtable) {
				renderComponent = (
					<TimeTrackingTable
						begin = {this.state.begin}
						end = {this.state.end}
					/>
				)
			} else if (this.state.renderTimeTrackingtable) {
				renderComponent = (
					<TimeTrackingTable begin={this.state.begin} end={this.state.end} />
				);
			} else renderComponent = (
				<Dashboard
					timeTrackingHandler={this.renderTimeTrackingTableHandler.bind(this)}
					renderCharts={this.renderCharts.bind(this)}
					invoicingHandler={this.renderInvoicingHandler.bind(this)}
				/>
			);
		} else if (this.state.renderLoginForm) {
			renderComponent = <LoginForm onLogin={this.authorizeUser.bind(this)} />;
		} else {
			renderComponent = (
				<LandingPage renderLoginForm={this.renderLoginForm.bind(this)} />
			);
		}

		return (
			<div className="App">
				<div className="content">
					<Navbar
						isLoggedIn={this.state.authorizedUser}
						message={this.state.message}
						renderLoginForm={this.renderLoginForm.bind(this)}
						onStop={this.onStop.bind(this)}
						dashboard={this.dashboardHandler.bind(this)}
						renderedTimes={this.state.renderTimeTrackingtable}
					/>
					{renderComponent}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
