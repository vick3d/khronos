import React, { Component } from 'react';
import { Table } from 'semantic-ui-react'

class SavedTimesList extends Component {
	render() {
		return (
			<Table name="savedTimes" celled >
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Customer</Table.HeaderCell>
						<Table.HeaderCell>Project</Table.HeaderCell>
						<Table.HeaderCell>Task</Table.HeaderCell>
						<Table.HeaderCell>Start</Table.HeaderCell>
						<Table.HeaderCell>End</Table.HeaderCell>
						<Table.HeaderCell>Rate</Table.HeaderCell>
						<Table.HeaderCell>Money Earned</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					<Table.Row>
					</Table.Row>
					<Table.Row>
					</Table.Row>
					<Table.Row>
					</Table.Row>
				</Table.Body>
			</Table>
		)
	}
}

export default SavedTimesList