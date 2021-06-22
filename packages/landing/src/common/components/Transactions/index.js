import React from 'react';

import TransactionsStyle from './transactions.style';

const Transactions = ({ ...props }) => {
  return (
    <TransactionsStyle {...props}>
      <span>Transactions</span>
    </TransactionsStyle>
  );
};

export default Transactions;
