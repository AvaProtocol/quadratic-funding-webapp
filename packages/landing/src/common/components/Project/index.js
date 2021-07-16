import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as faThumbsUpSolid } from '@fortawesome/free-solid-svg-icons';
// import { faThumbsUp} from '@fortawesome/pro-light-svg-icons';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import Button from 'common/components/Button';

import ProjectStyle from './project.style';
import { ellipsisAddress } from 'common/utils';
import _ from 'lodash';
import reduxHelper from 'redux/helper';
import backend from 'common/backend';
import notificationHelper from 'common/utils/notification.helper';
import { formatNumberThousands } from 'common/utils';

const Project = ({ project, Icon, projectRecords, account, ...props }) => {
  const {
    name,
    description,
    project_index,
    owner,
    username,
    create_block_number,
    roundId,
  } = project;

  const projectIndex = parseInt(project_index);

  const [projectRecord, setProjectRecord] = useState({});

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
        isLike: _.isNil(isLiked),
      },
    });

    reduxHelper.getProjects();
  };

  let likeText = 'Like';
  let isLiked = null;

  // Because projectRecord dependes on requesting data from network
  // So We must check it
  if (projectRecord && !_.isEmpty(projectRecord.likes)) {
    isLiked = _.find(projectRecord.likes, (item) => {
      return item === account;
    });

    likeText = `${formatNumberThousands(projectRecord.likes.length)} ${
      projectRecord.likes.length === 1 ? 'Like' : 'Likes'
    }`;
  }

  return (
    <ProjectStyle {...props}>
      <Link
        href={{ pathname: `/detail/${project_index}`, query: { rid: roundId } }}
      >
        <div>
          <Row className="title" justify="center">
            <span>{_.truncate(name, { length: 26, omission: ' ' })}</span>
          </Row>
          <Row className="description">
            <span>
              {_.truncate(description, { length: 190, omission: ' [...]' })}
            </span>
          </Row>
          <Row className="attribute">
            <Col span={8}>{Icon}</Col>
            <Col span={16}>
              <Row>
                <Col span={24}>
                  <span>Creator:</span>
                </Col>
                <Col span={24}>
                  <span>{username || ellipsisAddress(owner)}</span>
                </Col>
                <Col span={24}>
                  <span>Created Block No.: #{create_block_number}</span>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="action" justify="end">
            <div className="action-btn" onClick={onLikeClicked}>
              <Row justify="space-around" align="middle">
                <Col>
                  <span>{likeText}</span>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={isLiked ? faThumbsUpSolid : faThumbsUp}
                  ></FontAwesomeIcon>
                </Col>
              </Row>
            </div>
          </Row>
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
