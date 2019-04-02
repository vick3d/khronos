import React from 'react';
import { shallow, mount } from 'enzyme';

import TimeTrackingTable from '../Components/timeTrackingTable'
import axios from 'axios';

describe('<TimeTrackingTable />', () => {
  it('should send time registration from client to backend using Axios', () => {
    const axiosSpy = jest.spyOn(axios, 'post');
    shallow(
      <TimeTrackingTable />
    )
    expect(axiosSpy).toBeCalled();
  })

  it('should get a 200 response', async () => {
    const time = {"data":[

    ]}

    // We mount the component
    const describedComponent = mount(<TimeTrackingTable />)
    // we make sure that the components state is updated
    // await describedComponent.setState({ employees: employees.data })
    // we make sure that the component renders 5 instances on a list item (<li>)
  })
})