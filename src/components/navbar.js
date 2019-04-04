import React, { Component } from 'react';
import logo from '../img/image.png'
import { Image, Icon, Menu, Divider } from 'semantic-ui-react'

class Navbar extends Component {
	render() {
		return (
			<>
				<Menu>
					<Menu.Item link name='logo'>
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link disabled={this.props.isLoggedIn} name='sign-in'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon disabled={!this.props.isLoggedIn} name='sign-out'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon disabled={!this.props.isLoggedIn} name='play'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon disabled={!this.props.isLoggedIn} name='stop'size='big'/>
					</Menu.Item>
					<Menu.Item position='right'>
						<Icon link name='help'size='big'/>
						<Divider vertical />						
						<Icon link name='calendar alternate outline'size='big' />
					</Menu.Item>
				</Menu>
			</>
		)
	}
}

export default Navbar;