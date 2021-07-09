import { closeModal } from '@redq/reuse-modal';

const AccountSelectionModal = ({addresses, onClick}) => {
  console.log('AccountSelectionModal, addresses: ', addresses);
  const addressList = _.map(addresses, (address) => {
    return (
      <div style={{ height: 20, borderWidth: 1,  color: 'white', borderStyle: 'solid', borderColor: '#ccc', borderRadius: 5, marginTop: 10, marginLeft: 5, marginRight: 5, padding: 5 }} key={address} onClick={() => {
        closeModal();
        onClick(address);
      }}>
        <span>{address}</span>
      </div>
    );
  });
  return (
    <div style={{ height: 300, backgroundColor: '#d1397c', overflow: 'hidden' }}>
      <div style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, marginLeft: 15, color: 'white' }}>Select a wallet address:</div>
      <div style={{ height: '100%', overflow: 'scroll', margin: '0px 10px'}}>{addressList}</div>
    </div>
  );
}

export default AccountSelectionModal;

export const CloseComponent = () => {
  return (<div />);
}