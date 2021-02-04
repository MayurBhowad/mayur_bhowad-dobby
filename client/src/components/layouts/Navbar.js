import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/auth.action';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class Navbar extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
        window.location.href = '/login';
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/signup">Sign up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        )
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/add">Add Photo</Link>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {_.capitalize(user.username)}
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <Link className="dropdown-item" to="/dashboard">My Profile</Link>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#" onClick={this.onLogoutClick.bind(this)}>Logout</a>
                    </div>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">My Home </Link>
                </li>
            </ul>
        )
        return (
            <div>
                <nav className="navbar fixed-top navbar-toggleable-md navbar-expand-lg navbar-dark bg-dark">
                    <div className="container">
                        <Link className="navbar-brand" to='/dashboard'>Dobby-ads</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent" data-toggle="collapse" data-target=".navbar-collapse" >

                            {(isAuthenticated) ? authLinks : guestLinks}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(Navbar);
