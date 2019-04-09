import React, { Component } from 'react';
import { getTimeData } from "../modules/kimaiGetTimeData";
import TotalTimeChart from './totalTimeChart';
import TotalMoneyChart from './totalMoneyChart';
import { Header, Container, Grid } from 'semantic-ui-react'


class Charts extends Component {
	state = {
		timeData: [],
	};

	componentDidMount() {
		getTimeData().then(
			response => {
				this.setState({
					timeData: response
				});
			},
			reason => {
				console.log("something went wrong");
			}
		);
	}

	render() {
		return (
			<>
				<Header as='h1' textAlign='left'> My Charts </Header>
				<Container>
					<Grid>
						<TotalTimeChart />
						<TotalMoneyChart />
					</Grid>
				</Container>
			</>
		)
	}
}

export default Charts;