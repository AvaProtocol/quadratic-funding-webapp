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
    justify-content: space-between;
  }

  .operation div {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .search {
    border: 1px solid #f2f2f2;
    padding: 5px;
    border-radius: 10px;
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
