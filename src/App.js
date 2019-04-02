import React, { Component } from 'react';
import { TimeTrackingTable } from './Components/timeTrackingTable';
import { Segment, Header} from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Segment>
					<Header as='h1'textAlign='center'>
						Time Tracking
					</Header>
					<TimeTrackingTable />
				</Segment>
      </div>
    );
  }
}

export default App;