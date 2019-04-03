import React, { Component } from 'react';
import logo from '../img/image.png'
import { Image, Icon, Menu } from 'semantic-ui-react'

class Navbar extends Component {
	render() {
		return (
			<>
				<Menu>
					<Menu.Item link name='logo'>
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link name='user'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon link name='sign-in'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon disabled name='sign-out'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon disabled name='play'size='big'/>
					</Menu.Item>
					<Menu.Item >
						<Icon disabled name='stop'size='big'/>
					</Menu.Item>
					<Menu.Item>
						<Icon link name='help'size='big'/>
					</Menu.Item>
					<Menu.Item position='right'>
						<Icon link name='calendar alternate outline'size='big' />
					</Menu.Item>
				</Menu>
			</>
		)
	}
}

export default Navbar;