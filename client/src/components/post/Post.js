import React,{Fragment,useEffect} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Spinner from '../layout/spinner';
import PostTop from './PostTop';
import PostAbout from './PostAbout';
import {getPost} from '../../actions/post';



const Post = ({match,getPost,post:{post,loading},auth}) => {
    useEffect(() => {
        getPost(match.params.id);
    },
 [getPost,match.params.id]);
    console.log(post);
    
    return (
        <Fragment>
            {post === null ? <Spinner></Spinner> :
            <Fragment>

                    <PostTop post={post}/>

            </Fragment>
                }
        </Fragment>
    )
}

Post.propTypes = {
getPost: PropTypes.func.isRequired,
post: PropTypes.object.isRequired,
auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    post: state.post,
    auth: state.auth
})
export default connect(mapStateToProps,{getPost})(Post)
