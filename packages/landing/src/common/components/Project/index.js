import React from 'react';
import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'common/components/Button';

import ProjectStyle from './project.style';
import { ellipsisAddress } from 'common/utils';

const Project = ({ project, Icon, ...props }) => {
  const {
    name,
    description,
    project_index,
    owner,
    socialElements,
    username,
    create_block_number,
    roundId,
  } = project;
  return (
    <ProjectStyle {...props}>
      <Link href={{ pathname: `/detail/${project_index}`, query: { rid: roundId } }}>
        <div>
          <div>
            <span className="title">{name}</span>
            <span className="description">{description}</span>
          </div>

          <div className="identity">
            <div className="infomation">
              {/* <image className="photo"></image> */}
              {Icon}
              <div style={{ textAlign: 'left' }}>
                <span className="username">{`Username: ${
                  username || ellipsisAddress(owner)
                }`}</span>
                <span className="created">
                  Created at block #{create_block_number}
                </span>
              </div>
            </div>

            <span className="creator">{socialElements}</span>

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
        </div>
      </Link>
    </ProjectStyle>
  );
};

export default Project;
