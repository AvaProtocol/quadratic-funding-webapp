import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import cloudbase from '@cloudbase/js-sdk';

import Button from 'common/components/Button';
import CommentsStyle from './comments.style';
import Comment from '../Comment';
import backend from '../../backend';

const Comments = ({
  ...props
}) => {
  const { projectIndex: projectIndexStr, voteRecords, projectRecords } = props;
  const projectIndex = parseInt(projectIndexStr);

  const [comments, setComments] = useState([]);
  const [textareaValue, setTextareaValue] = useState('');

  const getComments = async () => {
    console.log('projectRecords: ', projectRecords);
    console.log('projectIndex: ', projectIndex);
    const projects = _.filter(projectRecords, (projectRecord) => {
      return projectRecord.index === projectIndex;
    });

    if (projects.length === 1) {
      const project = projects[0];
      setComments(project.comments);
    }
  }

  useEffect(getComments, []);

  const onCommentClicked = async () => {
    console.log('onCommentClicked');
    const app = backend.getApp();
    const result = await app.callFunction({
      name: 'comment',
      data: {
        address: props.account,
        comment: textareaValue,
        projectIndex,
      }
    });

    setTextareaValue('');

    getComments();
  }

  const getCommentList = (comments) => {
    const comnentList = _.map(_.clone(comments).reverse(), (comment) => {
      const voteAmount = _.reduce(voteRecords, (prev, vote) => {
        if (vote.address === comment.user && vote.projectIndex === projectIndex) {
          return prev + vote.amount;
        }
      }, 0);
      return (<Comment key={comment.timestamp} comment={comment} voteAmount={voteAmount} ></Comment>);
    });
    console.log('getCommentList, comments: ', comments);
    return comnentList;
  }

  const handleTextareaChange = (e) => {
    setTextareaValue(e.target.value);
  }

  return (
    <CommentsStyle
      {...props}
    >
      <div className="content-div">
        <textarea className="comment-input" value={textareaValue} onChange={handleTextareaChange}></textarea>
        <Button title="Leave a comment" className="leave-comment" onClick={onCommentClicked}></Button>
      </div>

      <div className="content-div">
        {getCommentList(comments)}
      </div>
    </CommentsStyle>
  );
};

const mapStateToProps = (state) => ({
  account: state.account,
  projectRecords: state.projects,
});

export default connect(mapStateToProps)(Comments);
