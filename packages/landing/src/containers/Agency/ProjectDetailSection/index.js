import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faStar } from '@fortawesome/free-solid-svg-icons';
import _ from 'lodash';

import Container from 'common/components/UI/Container';
import Comments from 'common/components/Comments';
import LineCharts from 'common/components/LineCharts';
import GroupedBar from 'common/components/GroupedBar';
import ProjectDetailWrapper from './projectDetailSection.style';

const ProjectDetailSection = ({
  project,
}) => {
  const { creator: { address, create }, description, contents, socialMedia, teamMembers } = project

  return (
    <ProjectDetailWrapper>
      <Container>
        <div className="title">
          <text style={{ fontSize: 30, fontWeight: 'bold' }}>Project Details</text>
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

        <div className="content">
          <text style={{ fontSize: 14 }}>Created by</text>
          <text className="mt-15">{address} at 3AM {create} UTC<a style={{ marginLeft: '30px' }} href='#'>View on Subscan</a></text>

          <text className="mt-30">{description}</text>

          <div style={{ display: 'flex', marginTop: '15px', flexDirection: 'column' }}>
          {
            _.map(contents, content => {
              return <text className="mt-15">{content}</text>
            })
          }
          </div>

          <div className="mt-15">
            {
              _.map(socialMedia, (social) => {
                return (
                  <div className="mt-15">
                    <FontAwesomeIcon icon={social.icon}></FontAwesomeIcon>
                    <text className="ml-10">{social.link}</text>
                  </div>
                )
              })
            }
          </div>

          <div className="charts">
            <LineCharts className="chart" />

            <GroupedBar className="chart" />
          </div>

          <text className="mt-30">Team Members</text>
          <div className="team-members">
            {
              _.map(teamMembers, member => {
                return (
                  <div className="member">
                    <image className="photo"></image>
                    <text className="mt-10 text-center">{member.name}</text>
                    <text className="mt-10 text-center">{member.experience}</text>
                  </div>
                )
              })
            }
          </div>
        </div>
      </Container>
    </ProjectDetailWrapper>
  );
};

export default ProjectDetailSection;
