import React, { Component } from 'react';
import { TimeTrackingTable } from './components/timeTrackingTable';
import { Segment, Header} from 'semantic-ui-react';
import LandingPage from './components/landingPage';
import Navbar from './components/navbar'
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <div className="App">
				<Navbar />
				<LandingPage />
				<Footer />
				<Segment name="timetracking">
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