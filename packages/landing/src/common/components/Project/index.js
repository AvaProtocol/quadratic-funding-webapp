import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import Button from 'common/components/Button';

import ProjectStyle from './project.style';
import { ellipsisAddress } from 'common/utils';
import _ from 'lodash';
import reduxHelper from 'redux/helper';
import backend from 'common/backend'
import notificationHelper from 'common/utils/notification.helper';
import { numberWithCommas } from 'common/utils';

const Project = ({ project, Icon, projectRecords, account, ...props }) => {
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

  const projectIndex = parseInt(project_index);

  const [projectRecord, setProjectRecord] = useState({})
  
  useEffect(async () => {
    const foundRecord = _.find(projectRecords, (projectRecord) => {
      return projectRecord.index === projectIndex;
    });
    setProjectRecord(foundRecord);
  }, [projectRecords]);

  const onLikeClicked = async (event) => {
    event.stopPropagation();

    if (_.isEmpty(account)) {
      notificationHelper.showNoWalletNotification();
      return;
    }

    const result = await backend.getApp().callFunction({
      name: 'like',
      data: {
        projectIndex,
        address: account,
        isLike: _.isNil(likeAccount)
      },
    });

    reduxHelper.getProjects();
  }  

  let likeText = "Like";
  let likeAccount = null;

  // Because projectRecord dependes on requesting data from network
  // So We must check it
  if (projectRecord && !_.isEmpty(projectRecord.likes)) {
    likeAccount = _.find(projectRecord.likes, (like) => {
      return like === account;
    });
    
    likeText = `${numberWithCommas(projectRecord.likes.length)} ${projectRecord.likes.length === 1 ? 'Like' : 'Likes'}`;
  }

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
                    <span className="username">{`Creator: ${
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
                    icon={<FontAwesomeIcon color={ likeAccount ? 'red' : 'white' } icon={faThumbsUp}></FontAwesomeIcon>}
                    title={likeText}
                    onClick = {onLikeClicked}
                  />
                </div>
              </div>
          </div>
        </Link>
    </ProjectStyle>
  );
};

const mapStateToProps = (state) => ({
  projectRecords: state.projects,
  account: state.account,
});

export default connect(mapStateToProps)(Project);