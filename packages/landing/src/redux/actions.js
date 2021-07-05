const actions = {
  INCREASE: 'INCREASE',
  SET_ACCOUNT: 'SET_ACCOUNT',
  
  increase: (text) => ({
    type: actions.INCREASE,
    text
  }),
  setAccount: (account) => ({
    type: actions.SET_ACCOUNT,
    account
  }),
};

export default actions;
