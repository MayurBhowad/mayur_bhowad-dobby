import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../../redux/actions/auth.action';


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            email: '',
            phone: '',
            role: '',
            password1: '',
            password2: '',
            errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/home')
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
            email: this.state.email,
            password1: this.state.password1,
            password2: this.state.password2
        };
        this.props.signupUser(newUser, this.props.history);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="login">
                <div class="card bg-light">
                    <article class="card-body mx-auto">
                        <h4 class="card-title mt-3 text-center">Create Account</h4>
                        <p class="text-center">Get Started with your free Account</p>

                        <form noValidate onSubmit={this.onSubmit}>
                            <div class="form-group input-group mb-0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-user-circle-o"></i></span>
                                </div>
                                <input type="text" name="username" placeholder="Full Name" class="form-control"
                                    value={this.state.username} onChange={this.onChange} />
                            </div>
                            <div style={{ 'color': 'red' }} className="mb-4">{this.state.errors.username}</div>
                            <div class="form-group input-group mb-0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                                </div>
                                <input type="email" name="email" placeholder="Email adrress" class="form-control"
                                    value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div style={{ 'color': 'red' }} className="mb-4">{this.state.errors.email}</div>

                            <div class="form-group input-group mb-0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-unlock-alt"></i></span>
                                </div>
                                <input type="password" name="password1" placeholder="Password" class="form-control"
                                    value={this.state.password1} onChange={this.onChange} />
                            </div>
                            <div style={{ 'color': 'red' }} className="mb-4">{this.state.errors.password1}</div>
                            <div class="form-group input-group mb-0">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fa fa-unlock-alt"></i></span>
                                </div>
                                <input type="password" name="password2" placeholder="Confirm Password" class="form-control"
                                    value={this.state.password2} onChange={this.onChange} />
                            </div>
                            <div style={{ 'color': 'red' }} className="mb-4">{this.state.errors.password2}</div>
                            <div class="form-group">
                                <button class="btn btn-primary btn-block" type="submit">Create Account</button>
                            </div>
                            <p class="text-center">Have an account? <Link to="/login">Login</Link></p>
                        </form>
                    </article>
                </div>
            </div>
        )
    }
}

Signup.propTypes = {
    signupUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { signupUser })(withRouter(Signup));