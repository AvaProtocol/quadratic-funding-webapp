import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

import CommentStyle from './comment.style';

const Comment = ({
  ...props
}) => {
  return (
    <CommentStyle
      {...props}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: 20 }}>
        <image className="photo"></image>
        <text style={{ marginTop: 10 }}>@username</text>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <text>This is awesome. I love the original idea of this project. Please keep it up!</text>
          <text style={{ marginLeft: 10 }}>3 days 13 hours ago</text>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <text>35 Likes </text>
            <text style={{ marginLeft: 50 }}>Also contributed 3.5 DOT</text>
          </div>

          <button className="button">
            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
            <text className="button-text">Like</text>
          </button>
        </div>
      </div>
    </CommentStyle>
  );
};

export default Comment;
