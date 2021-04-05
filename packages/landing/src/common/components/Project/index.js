import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';

import ProjectStyle from './project.style';

const Project = ({
  project,
  ...props
}) => {
  const { title, description, id, creator, socialElements } = project;
  const { photo, username, create } = creator;
  return (
    <ProjectStyle
      href={`/detail/${id}`}
      {...props}
    >
      <div>
        <text className="title">{title}</text>
        <text className="description">{description}</text>
      </div>

      <div className="identity">
        <div className="infomation">
          <image className="photo"></image>
          <div style={{ textAlign: 'left' }}>
            <text className="username">{username}</text>
            <text className="created">Created at {create}</text>
          </div>
        </div>

        <text className="creator">{socialElements}</text>

        <div className="buttons">
          <button className="button">
            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
            <text className="button-text">Like</text>
          </button>

          <button className="button">
            <FontAwesomeIcon icon={faStar}></FontAwesomeIcon>
            <text className="button-text">Favorite</text>
          </button>
        </div>
      </div>
    </ProjectStyle>
  );
};

export default Project;
