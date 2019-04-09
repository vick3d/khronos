import React, { Component } from 'react';
import { getTimeData } from "../modules/kimaiGetTimeData";
import TotalTimeChart from './totalTimeChart';
import TotalMoneyChart from './totalMoneyChart';
import { Header, Container, Grid } from 'semantic-ui-react'
import TodayTime from './todayTime';
import TodayMoney from './todayMoney';


class Charts extends Component {

	render() {
		return (
			<>
				<Header as='h1' textAlign='left'> My Charts </Header>
				<Container>
					<Grid>
						<TotalTimeChart />
						<TotalMoneyChart />
					</Grid>
					<Grid>
						<TodayTime />
						---------
						<TodayMoney />
					</Grid>
				</Container>
			</>
		)
	}
}

export default Charts;