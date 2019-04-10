import React, { Component } from 'react';
import { getTimeData } from "../modules/kimaiGetTimeData";
import TotalTimeChart from './totalTimeChart';
import TotalMoneyChart from './totalMoneyChart';
import { Header, Container, Grid, Table } from 'semantic-ui-react'
import TodayTime from './todayTime';
import TodayMoney from './todayMoney';


class Charts extends Component {

	render() {
		return (
			<>
				<Header as='h1' textAlign='center'> My Charts </Header>
				<Table>
					<Table.Row>
						<Table.Cell className='chart-size'>
							<TotalTimeChart />
						</Table.Cell>
						<Table.Cell className='chart-size'>
							<TotalMoneyChart />
						</Table.Cell>
					</Table.Row>
					<Table.Row>
						<Table.Cell className='info-box-number-l'>
							<Header as='h3' textAlign='left'> Working Hours (Today) </Header>
							<TodayTime />
						</Table.Cell>
						<Table.Cell className='info-box-number-r'>
							<Header as='h3' textAlign='left'> Revenue (Today) </Header>
							<TodayMoney />
						</Table.Cell>
					</Table.Row>
				</Table>
			</>
		)
	}
}

export default Charts;