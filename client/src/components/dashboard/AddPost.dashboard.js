import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createPost } from '../../redux/actions/post.action';
import Spinner from '../common/Spinner';

class AddPost extends Component {
    constructor() {
        super();
        this.state = {
            text: '',
            avatar: '',
            username: '',
            imagePreview: null,
            onImagePreview: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.errors) {
            this.setState({ errors: this.props.errors });
        }
    }

    onChangeHandler(e) {
        this.setState({
            onImagePreview: URL.createObjectURL(e.target.files[0]),
            imagePreview: e.target.files[0]
        })
    }

    onChange(e) { this.setState({ [e.target.name]: e.target.value }) }
    onSubmit(e) {
        e.preventDefault();

        const { imagePreview, text } = this.state;
        let postData = new FormData();
        postData.append('imagePreview', imagePreview)
        postData.append('text', text)
        this.props.createPost(postData, this.props.history);
    }

    render() {
        const { loading } = this.props.post;

        return (
            <div className="add-post">
                <div className="container">
                    <h1>Add Post</h1>
                    <hr />
                    <div className="card p-2">
                        <form action="" onSubmit={this.onSubmit}>
                            <div className="row">
                                <div className="col-md-5 col-lg-4">
                                    <div className="header-top-img">
                                        <a><img className="add-post-img" width="300px" height="auto" src={this.state.onImagePreview ? (this.state.onImagePreview) : "./assets/image/plus-small.jpg"} alt="Image to be uploaded" /></a>
                                    </div>
                                </div>
                                <div className="col-md-7 col-lg-8">
                                    <div className="caption">
                                        <h3>Add Name</h3>
                                        <div class="">
                                            <input className="form-control" type="text" placeholder="Name"
                                                name="text" onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="buttons">
                                        <div className="btn-post">
                                            <input type="file" id="addPic" name="addPic" hidden onChange={this.onChangeHandler} />
                                            <label className="btn btn-primary" htmlFor="addPic">Choose</label>
                                        </div>
                                        <div className="btn-post">
                                            <button type="submit" disabled={!this.state.text || this.state.imagePreview == null} className="btn btn-primary">Post</button>
                                        </div>
                                    </div>
                                    {loading ?
                                        <Spinner /> :
                                        ''
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                    <hr />
                </div>
            </div>
        )
    }
}

AddPost.propTypes = {
    createPost: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, { createPost })(AddPost);