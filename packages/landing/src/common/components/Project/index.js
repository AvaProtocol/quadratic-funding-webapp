import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';

import ProjectStyle from './project.style';

const Project = ({
  ...props
}) => {
  return (
    <ProjectStyle
      {...props}
    >
      <div>
        <text className="title">Project X</text>
        <text className="description">Description of Project X: Projext X is a decentralized smart contract application built on Substrate that we use to demonstrate this wirefreme.</text>
      </div>

      <div>
        <div className="identity">
          <image className="photo"></image>
          <div>
            <text className="username">@username</text>
            <text className="created">Created at 2021-02-01</text>
          </div>
        </div>

        <text className="creator">Also liked by @alice, @bob, @charlie and others</text>

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
