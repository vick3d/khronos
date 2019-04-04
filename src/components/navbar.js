import React, { Component } from 'react';
import logo from '../img/image.png'
import { Image, Icon, Menu, Divider, Message } from 'semantic-ui-react'

class Navbar extends Component {
	render() {
		if (this.props.isLoggedIn) {
			return (
				<Menu>
					<Menu.Item link name='logo'>
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link name='sign-out' size='big' />
					</Menu.Item>
					<Menu.Item >
						<Icon link name='play' size='big' />
					</Menu.Item>
					<Menu.Item >
						<Icon link name='stop' size='big' />
					</Menu.Item>
					<Message>{this.props.message}</Message>
					<Menu.Item position='right'>
						<Icon link name='help' size='big' />
						<Divider vertical />
						<Icon link name='calendar alternate outline' size='big' />
					</Menu.Item>
				</Menu>)
		} else {
			return (
				<Menu>
					<Menu.Item link name='logo'>
						<Image src={logo} id='logo' size='small' />
					</Menu.Item>
					<Menu.Item >
						<Icon link name='sign-in' size='big' />
					</Menu.Item>
					<Menu.Item position='right'>
						<Icon link name='help' size='big' />
						<Divider vertical />
					</Menu.Item>
				</Menu>
			)
		}
	}
}

export default Navbar;