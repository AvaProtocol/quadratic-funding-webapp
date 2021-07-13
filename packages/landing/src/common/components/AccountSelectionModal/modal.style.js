import styled from 'styled-components';
import { variant } from 'styled-system';

const ModalStyle = styled.div`
  /* Modal default style */
  height: 300px;
  background-color: #d1397c;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .titleRow {
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    margin-left: 15px;
    color: white;
  }

  .noWallet {
    margin-top: 25px;
  }

  .addressList {
    height: 100%;
    overflow: scroll;
    margin: 0px 10px;
  }

  .addressRow {
    height: 20px;
    border-width: 1px;
    color: white;
    border-style: solid;
    border-color: #ccc;
    border-radius: 5px;
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
    padding: 5px;
  }

  .content {
    margin-left: 15px;
    color: white;
    margin-top: 20px;
    font-size: 17px;
  }

  .button {
    width: 100px;
    height: 0px;
    margin-top: 130px;
    padding: 0;
    align-self: center;
    background-color: white;
    color: #d1397c;
  }
`;

// prop types can also be added from the style functions
ModalStyle.propTypes = {
  ...variant.propTypes,
};

ModalStyle.displayName = 'ModalStyle';

export default ModalStyle;
