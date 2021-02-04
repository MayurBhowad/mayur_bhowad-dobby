import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../redux/actions/auth.action';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
        // this.props.history.push('/dashboard')
    }

    render() {
        return (
            <div className="login">
                <div className="card bg-light">
                    <article className="card-body mx-auto">
                        <h4 className="card-title mt-3 text-center">Login to Account</h4>
                        <p className="text-center">Get Started </p>

                        <form noValidate onSubmit={this.onSubmit}>
                            <div className="form-group input-group mb-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-envelope"></i></span>
                                </div>
                                <input type="email" name="email" placeholder="Email adrress" className="form-control"
                                    value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div style={{ 'color': 'red' }} className="mb-4">{this.state.errors.email}</div>
                            <div className="form-group input-group mb-0">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fa fa-unlock-alt"></i></span>
                                </div>
                                <input type="password" name="password" placeholder="Password" className="form-control"
                                    value={this.state.password} onChange={this.onChange} />
                            </div>
                            <div style={{ 'color': 'red' }} className="mb-4">{this.state.errors.password}</div>
                            <div className="form-group mt-2">
                                <button className="btn btn-primary btn-block" type="submit">Login</button>
                            </div>
                            <p className="text-center">Don't have an account? <Link to="/signup">SignUp</Link></p>
                        </form>
                    </article>
                </div>
            </div>
        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login);
