import styled from 'styled-components';

const ProjectSectionWrapper = styled.section`
  padding: 80px 0;
  overflow: hidden;
  @media (max-width: 990px) {
    padding: 60px 0;
  }

  .operation {
    display: flex;
    margin-bottom: 20px;
  }

  .team__member {
    .icon__wrapper {
      /* display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center; */
    }
  }
`;

export default ProjectSectionWrapper;
