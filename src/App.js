import React, { Component } from 'react';
import { TimeTrackingTable } from './Components/timeTrackingTable';
import { Segment, Header} from 'semantic-ui-react';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			begin: '',
			end: '',
			customer: '',
			project: '',
			activity: '',
			description: '',
			fixedRate: '',
			hourlyRate: ''
    }
	}
  render() {
    return (
      <div className="App">
				<Segment name="timetracking">
					<Header as='h1'textAlign='center'>
						Time Tracking
					</Header>
					<TimeTrackingTable
						begin={this.state.begin}
						end={this.state.end}
						customer={this.state.customer}
						project={this.state.project}
						activity={this.state.activity}
						description={this.state.description}
						fixedRate={this.state.fixedRate}
						hourlyRate={this.state.hourlyRate}
					/>
				</Segment>
      </div>
    );
  }
}

export default App;