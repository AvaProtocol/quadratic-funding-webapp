import styled from 'styled-components';

const ProjectStyle = styled.nav`
  /* Project default style goes here */
  display: flex;
  flex-direction: column;
  background-color: rgba(237, 237, 240);
  border-radius: 20px;
  padding: 20px;

  div {
    display: flex;
    flex-direction: column;
  }

  .title {
    align-self: center;
    font-size: 30px;
  }

  .description {
    align-self: center;
    margin-top: 20px;
  }

  .identity {
    flex-direction: row;
    align-items: flex-end;
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid gray;
  }

  .photo {
    border-radius: 10px;
    width: 70px;
    height: 70px;
    border: 1px solid black;
  }

  .username {
    margin-left: 20px;
  }

  .created {
    margin-top: 5px;
    margin-left: 20px;
  }

  .creator {
    margin-top: 20px;
  }

  div.buttons {
    margin-top: 20px;
    flex-direction: row;
    justify-content: flex-end;
  }

  .button {
    border: 0;
    margin-left: 10px;
  }

  .button-text {
    margin-left: 5px;
  }

  @media only screen and (max-width: 600px) {
    .identity {
      flex-direction: column;
      align-items: flex-start;
    }

    .username {
      margin-left: 0px;
      margin-top: 10px;
    }
  
    .created {
      margin-top: 5px;
      margin-left: 0px;
    }
  }
`;

ProjectStyle.displayName = 'ProjectStyle';

export default ProjectStyle;
