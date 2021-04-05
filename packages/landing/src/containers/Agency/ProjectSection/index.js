import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSearch } from '@fortawesome/pro-light-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Box from 'common/components/Box';
import Project from 'common/components/Project';
import data from 'common/data/Agency';
import Container from 'common/components/UI/Container';
import ProjectSectionWrapper from './projectSection.style';

const ProjectSection = ({
  row,
  col,
}) => {
  return (
    <ProjectSectionWrapper id="teamSection">
      <Container>
        <div className="operation">
          <div>
            <div>
              <FontAwesomeIcon icon={faSlidersH}></FontAwesomeIcon>
              <text style={{ marginLeft: 10 }}>Sort By</text>
            </div>

            <div style={{ marginLeft: 30 }}>
              <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
              <text style={{ marginLeft: 10 }}>Filter</text>
            </div>
          </div>

          <div className="search">
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            <input style={{ border: 0, marginLeft: 5 }} placeholder="Search"></input>
          </div>
        </div>
        <Box className="row" {...row}>
          {data.projects.map((project, index) => (
            <Box className="col" {...col} key={`team_key-${index}`}>
              <Project project={project} />
            </Box>
          ))}
        </Box>
      </Container>
    </ProjectSectionWrapper>
  );
};

// ProjectSection style props
ProjectSection.propTypes = {
  sectionHeader: PropTypes.object,
  row: PropTypes.object,
  col: PropTypes.object,
  sectionTitle: PropTypes.object,
  sectionSubTitle: PropTypes.object,
};

// ProjectSection default style
ProjectSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: ['40px', '56px'],
  },
  // sub section default style
  sectionSubTitle: {
    as: 'span',
    display: 'block',
    textAlign: 'center',
    fontSize: '14px',
    letterSpacing: '0.15em',
    fontWeight: '700',
    color: '#10ac84',
    mb: '10px',
  },
  // section title default style
  sectionTitle: {
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  // Team member row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
    ml: '-15px',
    mr: '-15px',
  },
  // Team member col default style
  col: {
    width: [1, 1 / 2, 1 / 3, 1 / 3],
    pl: '15px',
    pr: '15px',
    mb: '30px',
  },
  // Team member content default style
  contentStyle: {
    textAlign: 'center',
    mt: '25px',
  },
  // Team member memberName default style
  memberName: {
    fontSize: ['18px', '18px', '16px', '20px'],
    fontWeight: '400',
    color: '#0f2137',
    lineHeight: '1.5',
    mb: '8px',
    letterSpacing: '-0.020em',
  },
  // Team member description default style
  designation: {
    fontSize: ['15px', '16px', '14px', '17px'],
    lineHeight: '1',
    color: 'rgba(15, 33, 55, 0.6)',
    mb: 0,
  },
};

export default ProjectSection;
