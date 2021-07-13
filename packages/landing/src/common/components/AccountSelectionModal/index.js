import { closeModal } from '@redq/reuse-modal';
import { connect } from 'react-redux';
import _ from 'lodash';
import ModalStyle from './modal.style';
import Button from 'common/components/Button';

const AccountSelectionModal = ({addresses, onClick, ...props}) => {

  const onAddressRowClicked = (address) => {
    closeModal();
    onClick(address);
  }

  const onCommentClicked = () => {
    closeModal();
  }

  if (_.isEmpty(addresses)) {
    return (
      <ModalStyle {...props}>
        <div className='titleRow noWallet'>No wallet</div>
        <div className='content'>Please install <a href='https://polkadot.js.org/extension/'>Polkadot{'\u007B'}.js{'\u007d'} extension</a>, and create wallet.</div>
        <Button className='button' title="OK" onClick={onCommentClicked}></Button>
      </ModalStyle>
    );
  }

  const addressList = _.map(addresses, (address) => {
    return (
      <div
        key={address}
        className='addressRow'
        onClick={() => onAddressRowClicked(address)}>
        <span>{address}</span>
      </div>
    );
  });

  return (
    <ModalStyle {...props}>
      <div className='titleRow'>Select a wallet address:</div>
      <div className='addressList'>{addressList}</div>
    </ModalStyle>
  );
}

const mapStateToProps = (state) => ({
  account: state.account,
  projectRecords: state.projects,
});

export default connect(mapStateToProps)(AccountSelectionModal);

export const CloseComponent = () => {
  return (<div />);
}
