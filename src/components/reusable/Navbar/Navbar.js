import React, { Component } from 'react';
import { NavigationToggle, NavigationButton, LoginButton, LogoutButton } from '../Buttons/Button';
import { connect } from 'react-redux';
import './Navbar.css';

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let { id } = this.props.user || ``
        return (
            <div className='Navbar'>
                <div className='navigation-bar-wrapper' >
                    <div className='navigation-bar' >
                        {
                            id ?
                                <LogoutButton>Logout</LogoutButton>
                                :
                                <LoginButton>Login</LoginButton>
                        }
                        <NavigationButton url='/home/' className='navigation-button'>
                            Home
                        </NavigationButton>

                        <NavigationButton url='/favorites' className='navigation-button'>
                            Favorites
                        </NavigationButton>

                        {
                            this.props.user.admin ?
                                <NavigationButton url='/admin/' className='navigation-button'>
                                    Admin
                                </NavigationButton>
                                :
                                null
                        }

                        {
                            this.props.user.admin ?
                                <NavigationButton url='/admin/users' className='navigation-button'>
                                    Users
                                </NavigationButton>
                                :
                                null
                        }

                    </div>
                    <NavigationToggle />
                </div>
                <div className='navigation-shadow' />
                <div className='responsive-shadow' />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

const outActions = {

}

export default connect(mapStateToProps, outActions)(Navbar);
