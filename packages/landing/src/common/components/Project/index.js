import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'common/components/Button';

import ProjectStyle from './project.style';

const Project = ({ project, Icon, ...props }) => {
  const { title, description, id, creator, socialElements } = project;
  const { photo, username, create } = creator;
  return (
    <ProjectStyle href={`/detail/${id}`} {...props}>
      <div>
        <text className="title">{title}</text>
        <text className="description">{description}</text>
      </div>

      <div className="identity">
        <div className="infomation">
          {/* <image className="photo"></image> */}
          {Icon}
          <div style={{ textAlign: 'left' }}>
            <text className="username">{username}</text>
            <text className="created">Created at {create}</text>
          </div>
        </div>

        <text className="creator">{socialElements}</text>

        <div className="buttons">
          <Button
            type="button"
            icon={<FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>}
            title="Like"
          />
          <Button
            className="button"
            type="button"
            icon={<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>}
            title="Favorite"
          />
        </div>
      </div>
    </ProjectStyle>
  );
};

export default Project;
