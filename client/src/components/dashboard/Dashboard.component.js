import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAllPosts } from '../../redux/actions/post.action'
import Spinner from '../common/Spinner';

export class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            text: ''
        }
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.getAllPosts(this.props.auth.user.id);
    }

    onChange(e) { this.setState({ [e.target.name]: e.target.value }) }

    render() {

        const { posts, loading } = this.props.post;
        let dashboardContent;

        if (posts === null || loading) {
            dashboardContent = <Spinner />
        } else {
            if (posts) {
                let serachStrr = [];
                if (posts.length > 0) {
                    posts.map(post => {
                        let searchName = post.image_name
                        if (searchName.includes(this.state.text)) {
                            serachStrr.push(post)
                        }
                        dashboardContent = serachStrr.map(post => (<DashboardCard post={post} />))
                    })
                } else {
                    dashboardContent = <h5>Images Not FOund!</h5>
                }
            }

        }

        return (
            <div className="dashboard">
                <div className="search px-4">
                    <p>Search By Name</p>
                    <input className="form-control" type="text" placeholder="Name"
                        name="text" onChange={this.onChange} />
                </div>
                <hr />
                <div className=" container-fluid">
                    <div className="row justify-content-center">
                        {dashboardContent}
                    </div>
                </div>
            </div>
        )
    }
}


export const DashboardCard = ({ post }) => {
    return (
        <div key={post._id} className="col-auto mb-3">
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <img src={post.image_path} alt="" />
                    <div className="actions"><p>{post.image_name}</p>
                        {/* <button className="btn btn-danger" >delete</button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})

export default connect(mapStateToProps, { getAllPosts })(Dashboard)
