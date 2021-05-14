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
    id,
    owner,
    socialElements,
    username,
    create_block_number,
    roundId,
  } = project;
  return (
    <ProjectStyle {...props}>
      <Link href={{ pathname: `/detail/${id}`, query: { rid: roundId } }}>
        <a>
          <div>
            <text className="title">{`Project: ${name}`}</text>
            <text className="description">{description}</text>
          </div>

          <div className="identity">
            <div className="infomation">
              {/* <image className="photo"></image> */}
              {Icon}
              <div style={{ textAlign: 'left' }}>
                <text className="username">{`Username: ${
                  username || ellipsisAddress(owner)
                }`}</text>
                <text className="created">
                  Created at block #{create_block_number}
                </text>
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
        </a>
      </Link>
    </ProjectStyle>
  );
};

export default Project;
