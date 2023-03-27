import React from 'react';
import {Navbar, Nav} from 'react-bootstrap'
import './AppNavBar.scss'

const TopMenu = () => {
    return (
        <Navbar className="menu-top">
            <Nav>
                <Nav.Link href='/'>
                    Home
                </Nav.Link>
                <Nav.Link href='/login'>
                    Sign up
                </Nav.Link>
                <Nav.Link href='/signup'>
                    Sign in
                </Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default TopMenu;
