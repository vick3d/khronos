import React, { Component } from 'react';
import logo from '../img/logo.png'
import { Segment, Image} from 'semantic-ui-react'

class Navbar extends Component {
  render() {
    return(
      <>
      
        <Segment inverted color='orange' textAlign='left' name="logo">
					<Image src={logo}/>
				</Segment>
      </>
    )
  }  
}

export default Navbar;