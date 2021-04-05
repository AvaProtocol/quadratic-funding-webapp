import React from 'react';

import Button from 'common/components/Button';
import CommentsStyle from './comments.style';

import Comment from '../Comment';

const Comments = ({
  ...props
}) => {
  return (
    <CommentsStyle
      {...props}
    >
      <div className="content-div">
        <textarea className="comment-input"></textarea>
        <Button title="Leave a comment" className="leave-comment"></Button>
      </div>

      <div className="content-div">
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
      </div>
    </CommentsStyle>
  );
};

export default Comments;
