import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Button from 'common/components/Button';

import CommentStyle from './comment.style';

const Comment = ({ ...props }) => {
  return (
    <CommentStyle {...props}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginRight: 20,
        }}
      >
        <image className="photo"></image>
        <text style={{ marginTop: 10 }}>@username</text>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span>
            This is awesome. I love the original idea of this project. Please
            keep it up!
          </span>
          <span style={{ marginLeft: 10 }}>3 days 13 hours ago</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>35 Likes </span>
            <span style={{ marginLeft: 50 }}>Also contributed 3.5 DOT</span>
          </div>

          {/* <button className="button">
            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
            <text className="button-text">Like</text>
          </button> */}
          <Button
            type="button"
            icon={<FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>}
            title="Like"
          />
        </div>
      </div>
    </CommentStyle>
  );
};

export default Comment;
