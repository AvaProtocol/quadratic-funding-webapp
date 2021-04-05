import React from 'react';

import TransactionsStyle from './transactions.style';

const Transactions = ({
  ...props
}) => {
  return (
    <TransactionsStyle
      {...props}
    >
      <text>Transactions</text>
    </TransactionsStyle>
  );
};

export default Transactions;
