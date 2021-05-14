import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

import Container from 'common/components/UI/Container';
import Comments from 'common/components/Comments';
import LineCharts from 'common/components/LineCharts';
import GroupedBar from 'common/components/GroupedBar';
import ProjectDetailWrapper from './projectDetailSection.style';
import Button from 'common/components/Button';
import { PolkadotContext } from 'common/contexts/PolkadotContext';
import { Spin } from 'antd';
import { ellipsisAddress } from 'common/utils';

const ProjectDetailSection = ({ project }) => {
  const polkadotContext = useContext(PolkadotContext);
  const [loading, setLoading] = useState(true);
  const [projectDetail, setProjectDetail] = useState({});

  useEffect(() => {
    if (!_.isEmpty(polkadotContext)) {
      setLoading(false);
      setProjectDetail(polkadotContext.projectDetail);
    }
  }, [polkadotContext.projectDetail]);

  return (
    <ProjectDetailWrapper>
      <Container>
        {loading ? (
          <Spin size="large"></Spin>
        ) : (
          <>
            <div className="title">
              <text style={{ fontSize: 30, fontWeight: 'bold' }}>
                Project Details
              </text>
              <div className="buttons">
                <Button
                  type="button"
                  icon={<FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>}
                  title="Like"
                />
                <Button
                  className="ml-5"
                  type="button"
                  icon={<FontAwesomeIcon icon={faStar}></FontAwesomeIcon>}
                  title="Favorite"
                />
              </div>
            </div>

            <div className="content">
              <text style={{ fontSize: 14 }}>Created by</text>
              <text className="mt-15">
                {projectDetail.username || ellipsisAddress(projectDetail.owner)}{' '}
                at block #{projectDetail.create_block_number}
                <a style={{ marginLeft: '30px' }} href="#">
                  View on Subscan
                </a>
              </text>

              <text className="mt-30">{projectDetail.description}</text>

              <div
                style={{
                  display: 'flex',
                  marginTop: '15px',
                  flexDirection: 'column',
                }}
              >
                {_.map(projectDetail.contents, (content) => {
                  return <text className="mt-15">{projectDetail.content}</text>;
                })}
              </div>

              <div className="mt-15">
                {_.map(projectDetail.socialMedia, (social) => {
                  return (
                    <div className="mt-15">
                      <FontAwesomeIcon icon={social.icon}></FontAwesomeIcon>
                      <text className="ml-10">{social.link}</text>
                    </div>
                  );
                })}
              </div>

              <div className="charts">
                <LineCharts className="chart" />

                <GroupedBar className="chart" />
              </div>

              <text className="mt-30">Team Members</text>
              <div className="team-members">
                {_.map(projectDetail.teamMembers, (member) => {
                  return (
                    <div className="member">
                      {/* <image className="photo"></image> */}
                      <text className="mt-10 text-center">{member.name}</text>
                      <text className="mt-10 text-center">
                        {member.experience}
                      </text>
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

export default ProjectDetailSection;
