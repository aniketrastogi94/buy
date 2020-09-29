import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const PostTop = ({post: {
    text,
    name,category,
    subject,image,date,user
}}) => {
    return (
        <div class="profile-top bg-primary p-2">
          <img
            class="round-img my-1"
            src={image}
            alt=""
          />
          <h1 class="large">{name}</h1>
    <p class="lead">{text} {category && <span>at {category}</span>}</p>
    <p>{subject && <span>{subject}</span>}</p>
    <Link to={`/profile/${user}`}>Go to profile</Link>
          {/* <div class="icons my-1">
             
                  {
                      social && social.facebook && (
                        <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-facebook fa-2x"></i>
                      </a>

                      )
                  }

{
                      social && social.linkedin && (
                        <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-linkedin fa-2x"></i>
                      </a>
                      )
                  }   
          </div> */}
          </div>
    )
}

PostTop.propTypes = {
post: PropTypes.object.isRequired,
}

export default (PostTop)
