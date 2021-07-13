import React, { useState, useEffect, useContext } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';
import { Spin } from 'antd';

import Container from 'common/components/UI/Container';
import LineCharts from 'common/components/LineCharts';
import GroupedBar from 'common/components/GroupedBar';
import Button from 'common/components/Button';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import { ellipsisAddress } from 'common/utils';
import reduxHelper from '../../../redux/helper';
import backend from '../../../common/backend';
import notificationHelper from '../../../common/utils/notification.helper';
import ProjectDetailWrapper from './projectDetailSection.style';

const ProjectDetailSection = ({projectRecords, account}) => {
  const polkadotContext = useContext(PolkadotContext);
  const [loading, setLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState({});
  const [projectRecord, setProjectRecord] = useState({})
  
  useEffect(async () => {
    if (!_.isEmpty(polkadotContext)) {
      setLoading(false);
      setProjectDetail(polkadotContext.projectDetail);
    }
    if (!polkadotContext.projectDetail) {
      return;
    }
    const projectIndex = parseInt(polkadotContext.projectDetail.project_index);
    const foundRecord = _.find(projectRecords, (projectRecord) => {
      return projectRecord.index === projectIndex;
    });
    
    setProjectRecord(foundRecord);
  }, [projectRecords, polkadotContext.projectDetail]);

  let likeAccount = null;
  if (projectRecord) {
    likeAccount = _.find(projectRecord.likes, (like) => {
      return like === account;
    });
  }
  
  const onLikeClicked = async () => {
    if (_.isEmpty(account)) {
      notificationHelper.showNoWalletNotification();
      return;
    }


    if (!polkadotContext.projectDetail) {
      return;
    }
    const projectIndex = parseInt(polkadotContext.projectDetail.project_index);
    await backend.getApp().callFunction({
      name: 'like',
      data: {
        projectIndex,
        address: account,
        isLike: _.isNil(likeAccount)
      }
    });

    reduxHelper.getProjects();
  }

  let likeText = "Like";
  if (projectRecord && !_.isEmpty(projectRecord.likes)) {
    if (projectRecord.likes.length === 1){
      likeText = `${projectRecord.likes.length} Like`;
    } else {
      likeText = `${projectRecord.likes.length} Likes`;
    }
  }

  return (
    <ProjectDetailWrapper>
      <Container>
        {loading ? (
          <Spin size="large"></Spin>
        ) : (
          <>
            <div className="title">
              <span style={{ fontSize: 30, fontWeight: 'bold' }}>
                Project Details
              </span>
              <div className="buttons">
                <Button
                  type="button"
                  icon={<FontAwesomeIcon color={ likeAccount ? 'red' : 'white' } icon={faThumbsUp}></FontAwesomeIcon>}
                  title={likeText}
                  onClick={onLikeClicked}
                />
              </div>
            </div>

            <div className="content">
              <span style={{ fontSize: 14 }}>Created by</span>
              <span className="mt-15">
                {projectDetail.username || ellipsisAddress(projectDetail.owner)}{' '}
                at block #{projectDetail.create_block_number}
                <a style={{ marginLeft: '30px' }} href={`https://polkadot.subscan.io/account/${projectDetail.owner}`} target="_blank">
                  View on Subscan
                </a>
              </span>

              <span className="mt-30">{projectDetail.description}</span>

              <div
                style={{
                  display: 'flex',
                  marginTop: '15px',
                  flexDirection: 'column',
                }}
              >
                {_.map(projectDetail.contents, (content) => {
                  return <span className="mt-15">{projectDetail.content}</span>;
                })}
              </div>

              <div className="mt-15">
                {_.map(projectDetail.socialMedia, (social) => {
                  return (
                    <div className="mt-15">
                      <FontAwesomeIcon icon={social.icon}></FontAwesomeIcon>
                      <span className="ml-10">{social.link}</span>
                    </div>
                  );
                })}
              </div>

              <div className="charts">
                <LineCharts className="chart" />

                <GroupedBar className="chart" />
              </div>

              <span className="mt-30">Team Members</span>
              <div className="team-members">
                {_.map(projectDetail.teamMembers, (member) => {
                  return (
                    <div className="member">
                      {/* <image className="photo"></image> */}
                      <span className="mt-10 text-center">{member.name}</span>
                      <span className="mt-10 text-center">
                        {member.experience}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </Container>
    </ProjectDetailWrapper>
  );
};

const mapStateToProps = (state) => ({
  projectRecords: state.projects,
  account: state.account,
});

export default connect(mapStateToProps)(ProjectDetailSection);