import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlidersH, faSearch } from '@fortawesome/pro-light-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Box from 'common/components/Box';
import Project from 'common/components/Project';
import Button from 'common/components/Button';
import Input from 'common/components/Input';
import FeatureBlock from 'common/components/FeatureBlock';
import data from 'common/data/Agency';
import Container from 'common/components/UI/Container';
import Heading from 'common/components/Heading';
import Text from 'common/components/Text';
import ProjectSectionWrapper from './projectSection.style';

const ProjectSection = ({
  row,
  col,
  sectionHeader,
  sectionTitle,
  sectionSubTitle,
  featureTitle,
  featureDescription,
  iconStyle,
  contentStyle,
  blockWrapperStyle,
}) => {
  return (
    <ProjectSectionWrapper id="teamSection">
      <Container>
        <Box {...sectionHeader}>
          <Text {...sectionSubTitle} />
          <Heading {...sectionTitle} />
        </Box>

        <div className="operation">
          <div>
            <Button
              type="button"
              icon={<FontAwesomeIcon icon={faSlidersH}></FontAwesomeIcon>}
              title="Sort By"
            />

            <div style={{ marginLeft: 30 }}>
              <Button
                type="button"
                icon={<FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>}
                title="Filter"
              />
            </div>
          </div>

          <Input
            icon={<FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>}
            isMaterial={false}
            placeholder="Search"
          />
        </div>

        <Box className="row" {...row}>
          {/* {data.projects.map((project, index) => ( */}
          {data.projects.map((project, index) => (
            // <Box className="col" {...col} key={`team_key-${index}`}>
            //   <Project project={project} />
            // </Box>
            <Box className="col" {...col} key={`project-${index}`}>
              <FeatureBlock
                icon={<i className="flaticon-atom" />}
                wrapperStyle={blockWrapperStyle}
                iconStyle={iconStyle}
                contentStyle={contentStyle}
                project={project}
                title={project.title}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </ProjectSectionWrapper>
  );
};

// ProjectSection style props
ProjectSection.defaultProps = {
  // section header default style
  sectionHeader: {
    mb: ['40px', '56px'],
  },
  // sub section default style
  sectionSubTitle: {
    content: 'ACTIVE PROJECTS',
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
    content: 'All active project in this round',
    textAlign: 'center',
    fontSize: ['20px', '24px'],
    fontWeight: '400',
    color: '#0f2137',
    letterSpacing: '-0.025em',
    mb: '0',
  },
  // feature row default style
  row: {
    flexBox: true,
    flexWrap: 'wrap',
  },
  // feature col default style
  col: {
    width: [1, 1 / 2, 1 / 2, 1 / 3],
    borderLeft: '1px solid #f1f4f6',
    borderBottom: '1px solid #f1f4f6',
  },
  // feature block wrapper default style
  blockWrapperStyle: {
    p: ['30px', '20px', '30px', '40px'],
  },
  // feature icon default style
  iconStyle: {
    width: '84px',
    height: '84px',
    m: '0 auto',
    borderRadius: '50%',
    bg: '#93d26e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '36px',
    color: '#ffffff',
    overflow: 'hidden',
    mb: '30px',
  },
  // feature content default style
  contentStyle: {
    textAlign: 'center',
  },
  // feature title default style
  featureTitle: {
    fontSize: ['18px', '20px'],
    fontWeight: '400',
    color: '#0f2137',
    lineHeight: '1.5',
    mb: ['10px', '10px', '10px', '20px'],
    letterSpacing: '-0.020em',
  },
  // feature description default style
  featureDescription: {
    fontSize: '15px',
    lineHeight: '1.75',
    color: '#343d48cc',
  },
};

export default ProjectSection;
